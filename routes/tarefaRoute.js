import { Router } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tarefaRoute = (connection) => {
    const router = Router();

    router.get("/tarefas", (req, res) => {
        res.sendFile(join(__dirname, "../public/tarefas.html"));
    });

    return router;
};

export default tarefaRoute;