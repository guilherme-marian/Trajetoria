import { Router } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const notesRoute = (connection) => {
    const router = Router();

    router.get("/notas", (req, res) => {
        res.sendFile(join(__dirname, "../public/notas.html"));
    });

    router.post('/notas', (req, res) => {
        const { title, content, color, user_id } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: 'Preencha título e conteúdo' });
        }

        connection.query(
            'INSERT INTO Notes (title, content, color, user_id) VALUES (?, ?, ?, ?)',
            [title, content, color || '#2f382f', user_id || null],
            (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro no servidor' });
            }
            res.json({ success: true, id: results.insertId });
            }
        );
    });

    router.get('/notas/:userId', (req, res) => {
        const userId = req.params.userId;
        connection.query(
            'SELECT id_notes, title, content, color, created_at FROM Notes WHERE user_id = ? ORDER BY created_at ASC',
            [userId],
            (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro no servidor' });
            }
            res.json(results);
            }
        );
    });

    return router;
};

export default notesRoute;
