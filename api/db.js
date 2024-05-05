const mysql = require('mysql2/promise');
 
const client = mysql.createPool(process.env.CONNECTION_STRING);

async function selectCustomersNewsletter() {
    const res = await client.query('SELECT * FROM newsletter');
    return res[0];
}

async function buscarEmailNewsletter(email) {
    const res = await client.query('select email from newsletter where email = ?;', [email]);
    return res[0];
}

async function buscarTelefoneNewsletter(telefone) {
    const res = await client.query('select telefone from newsletter where telefone = ?;', [telefone]);
    return res[0];
}
 
async function cadastrarNewsletter(usuario) {

    const sql = 'insert into newsletter (nome, email, telefone) values (?,?,?);';
    const values = [usuario.nome, usuario.email, usuario.telefone];
    await client.query(sql, values);
}
 
async function buscarEmailCadastro(email) {
    const res = await client.query('select email from cadastro_login where email = ?;', [email]);
    return res[0];
}

async function buscarUsuarioCadastro(usuario) {
    const res = await client.query('select usuario from cadastro_login where usuario = ?;', [usuario]);
    return res[0];
}

async function cadastrarUsuario(usuario) {

    const sql = 'insert into cadastro_login (nome, email, usuario, senha) values (?,?,?,?);';
    const values = [usuario.nome, usuario.email, usuario.usuario, usuario.senha];
    await client.query(sql, values);
}

async function login(usuario) {
    const res = await client.query('select nome from cadastro_login where usuario = ? and senha = ?;', [usuario.usuario, usuario.senha]);
    return res[0];
}

module.exports = { selectCustomersNewsletter,
    buscarEmailNewsletter,
    buscarTelefoneNewsletter,
    cadastrarNewsletter,
    buscarEmailCadastro,
    buscarUsuarioCadastro,
    cadastrarUsuario,
    login }
 
