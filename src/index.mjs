import express, { response } from 'express';
import mysql from 'mysql2';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
import path from 'path';

const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root'
})

app.use(express.static('public'));
app.use('public', express.static(__dirname + '/../style.css'));

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/index.html") );
});


app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});