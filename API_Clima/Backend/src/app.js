import express from 'express';
import cors from 'cors';
import { createLocalidade, createRegistro, readLocalidade, readRegistro } from './Controller/ClimaController.js';

const PORT = 3000;
const app = express();

// Adicione esta linha antes de outras configurações
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({mensagem: 'API Funcionando!'});
})

app.post('/localidade', createLocalidade)
app.get('/localidade', readLocalidade)
app.post('/registro', createRegistro )
app.get('/registro', readRegistro )

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`)
});