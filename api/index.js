require("dotenv").config();

const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT;
const db = require('./db');

app.use(express.json());

app.use(cors({
    origin: '*'
}));
 
app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

app.post('/cadastro', async (req, res) => {
    try{
        const email = await db.buscarEmail(req.body.email);
        if(email.length !== 0){
            res.status(400).json({erro: 'Email já cadastrado!'});
            return;
        }

        const telefone = await db.buscarTelefone(req.body.telefone);
        if(telefone.length !== 0){
            res.status(400).json({erro: 'Telefone já cadastrado!'});
            return;
        }

        await db.cadastrar(req.body);
        res.sendStatus(201);
    }
    catch(e){
        res.status(500).json('Erro ao acessar o banco: ' + e.message);
    }
});

//inicia o servidor
app.listen(port);
console.log('API funcionando!');