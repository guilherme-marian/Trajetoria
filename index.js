import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import path from 'path';
import { spawn } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

import notesRoute from './routes/notesRoute.js';
import aboutRoute from './routes/aboutUsRoute.js';
import tarefaRoute from './routes/tarefaRoute.js';
import loginRoute from './routes/loginRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

const connection = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'trajetoria'
});

app.use(notesRoute(connection));
app.use(aboutRoute(connection));
app.use(tarefaRoute(connection));
app.use(loginRoute(connection));

connection.connect (function(err) {
    if(err) {
        console.error("Error: ", err);
        return;
    }
    else {
        console.log("Conexão bem sucedida!");
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.post('/Criar', (req, res) => {
    const {line, title, GraphType, user_id} = req.body; 
    const jsonString = JSON.stringify(line);
    const imageName = `output_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.png`;
    console.log('Received data:', jsonString);
    console.log('Generated image name:', imageName);
    console.log('Chart title:', title);
    console.log('Graph type:', GraphType);
    
    connection.query(
    'INSERT INTO Graphs (title, chart_type, data_json, user_id, image_path) VALUES (?, ?, ?, ?, ?)',
    [title, GraphType, jsonString, user_id, imageName],
    (err, results) => {
        if (err) {
        console.error(err);
        return res.status(500).send('Erro no servidor');
        }
        console.log('Registro bem sucedido!');
    });

    const pythonProcess = spawn(
        'python',
        [path.join(__dirname, '/public/python/graph.py'), jsonString, imageName, title, GraphType],
        { cwd: __dirname }
    );

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        console.error(`Python error: ${data}`);
        console.log(`Output: ${data}`);
        result += data;
    });

    pythonProcess.on('error', (err) => {
        console.error('Failed to start Python process:', err);
        return res.status(500).json({ status: 'error', error: 'Failed to start Python process', details: String(err) });
    });

    pythonProcess.on('close', (code) => {
        console.log(`Process exited with code ${code}`);
        res.json({ status: 'success', data: result, imagePath: `/img/${imageName}`  });
    });
});

app.get('/user-graphs/:userId', (req, res) => {
  const userId = req.params.userId;
  connection.query(
    'SELECT id, title, chart_type, data_json, image_path FROM Graphs WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro no servidor');
      }
      res.json(results);
    }
  );
});

app.get('/api-key', (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});

app.listen(3000, () => {
    console.log("server rodando: http://localhost:3000");
});

