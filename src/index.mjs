import express, { response } from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
import path from 'path';

app.use(express.static('public'));
app.use('public', express.static(__dirname + '/../style.css'));

const PORT = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/index.html") );
});


app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});