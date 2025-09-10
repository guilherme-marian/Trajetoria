import { Router } from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const aboutRoute = (connection) => {
    const router = Router();

    router.get('/aboutUs', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/aboutUs.html'));
    });

    return router;
}

export default aboutRoute;
