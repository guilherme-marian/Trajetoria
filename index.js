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
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const {people, title, chart_type} = req.body; 
    const jsonString = JSON.stringify(people);
    const imageName = `output_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.png`;
    console.log('Received data:', jsonString);
    console.log('Generated image name:', imageName);
    console.log('Chart title:', title);
    console.log('Graph type:', chart_type);
    
    connection.query('INSERT INTO Graphs (data_json) VALUES (?)', [jsonString])

    const pythonProcess = spawn(
        'python',
        [path.join(__dirname, '/public/python/graph.py'), jsonString, imageName, title, chart_type],
        { cwd: __dirname }
    );

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        console.error(`Python error: ${data}`);
        console.log(`Output: ${data}`);
        result += data;
    });

    pythonProcess.on('close', (code) => {
        console.log(`Process exited with code ${code}`);
        res.json({ status: 'success', data: result, imagePath: `/img/${imageName}`  });
    });
});

app.listen(3000, () => {
    console.log("server rodando: http://localhost:3000");
});

