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

app.post('/cadastronewsletter', async (req, res) => {
    try{
        const email = await db.buscarEmailNewsletter(req.body.email);
        if(email.length !== 0){
            res.status(400).json({erro: 'Email já cadastrado!'});
            return;
        }

        const telefone = await db.buscarTelefoneNewsletter(req.body.telefone);
        if(telefone.length !== 0){
            res.status(400).json({erro: 'Telefone já cadastrado!'});
            return;
        }

        await db.cadastrarNewsletter(req.body);
        res.sendStatus(201);
    }
    catch(e){
        res.status(500).json('Erro ao acessar o banco: ' + e.message);
    }
});

app.post('/cadastrologin', async (req, res) => {
    try{
        const email = await db.buscarUsuarioCadastro(req.body.usuario);
        if(email.length !== 0){
            res.status(400).json({erro: 'Usuário já cadastrado!'});
            return;
        }

        const telefone = await db.buscarEmailCadastro(req.body.email);
        if(telefone.length !== 0){
            res.status(400).json({erro: 'Email já cadastrado!'});
            return;
        }

        await db.cadastrarUsuario(req.body);
        res.sendStatus(201);
    }
    catch(e){
        res.status(500).json('Erro ao acessar o banco: ' + e.message);
    }
});

app.post('/login', async (req, res) => {
    try{
        const usuario_cadastrado = await db.login(req.body);
        if(usuario_cadastrado.length == 0){
            res.status(401).json({erro: 'Usuário e/ou senha incorretos'});
            return;
        }

        res.status(200).json({permitido: true, usuario: usuario_cadastrado[0].nome});
        return;
    }
    catch(e){
        res.status(500).json('Erro ao acessar o banco: ' + e.message);
    }
});

//inicia o servidor
app.listen(port);
console.log('API funcionando!');