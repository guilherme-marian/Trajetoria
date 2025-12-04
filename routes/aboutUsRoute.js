import { Router } from "express";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const aboutRoute = (connection) => {
    const router = Router();

    router.get('/aboutUs', (req, res) => {
        res.sendFile(join(__dirname, '../public/sobre.html'));
    });

    return router;
}

export default aboutRoute;
