import { Router } from "express";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loginRoute = (connection) => {
    const router = Router();

    router.get('/login', (req, res) => {
        res.sendFile(join(__dirname, '../public/login.html'));
    });

    router.get('/register', (req, res) => {
        res.sendFile(join(__dirname, '../public/registrar.html'));
    });

    router.post('/loginAccount', (req, res) => {
        const { username, password } = req.body;
        connection.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Erro no servidor');
            }
            else if (results.length > 0) {
                res.send('Login bem sucedido!');
                res.redirect('/home');
            }
            else {
                res.status(401).send('Credenciais inválidas');
            }
        });
    });

    router.post('/registerAccount', (req, res) => {
        const { username, password } = req.body;   
        connection.query('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Erro no servidor');
            }
            else {
                res.send('Registro bem sucedido!');
                res.redirect('/home');
            }
        });
    });

    return router;
}

export default loginRoute;
