import { Router } from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const notesRoute = (connection) => {
    const router = Router();

    router.get('/notas', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/notes.html'));
    });

    return router;
};

export default notesRoute;
