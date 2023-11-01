const mysql = require('mysql2/promise');
 
const client = mysql.createPool(process.env.CONNECTION_STRING);

async function selectCustomers() {
    const res = await client.query('SELECT * FROM cadastro');
    return res[0];
}

async function buscarEmail(email) {
    const res = await client.query('select email from cadastro where email = ?;', [email]);
    return res[0];
}

async function buscarTelefone(telefone) {
    const res = await client.query('select telefone from cadastro where telefone = ?;', [telefone]);
    return res[0];
}
 
async function cadastrar(usuario) {

    const sql = 'insert into cadastro (nome, email, telefone) values (?,?,?);';
    const values = [usuario.nome, usuario.email, usuario.telefone];
    await client.query(sql, values);
}
 
module.exports = { selectCustomers, buscarEmail, buscarTelefone, cadastrar }
 
