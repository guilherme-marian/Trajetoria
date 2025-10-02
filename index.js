import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import notesRoute from './routes/notesRoute.js';
import aboutRoute from './routes/aboutUsRoute.js';

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
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => {
    console.log("server rodando: http://localhost:3000");
});