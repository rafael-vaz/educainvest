document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('usuario-logado') !== null) {
        console.log('usuário logado: ' + localStorage.getItem('usuario-logado'));
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('logout-button').style.display = 'flex';
    } else {
        console.log('nenhum usuário logado!');
        document.getElementById('login-button').style.display = 'flex';
        document.getElementById('logout-button').style.display = 'none';
      }
    
    document.getElementById('logout-button').addEventListener("click", deslogar_usuario);
});

async function cadastro_usuario(){
    const nome = document.getElementById('nome-cadastro').value.trim();
    const email = document.getElementById('email-cadastro').value.trim();
    const usuario_cadastro = document.getElementById('usuario-cadastro').value.trim();
    const senha = document.getElementById('senha-cadastro').value;
    
    const usuario = {
      nome: nome,
      email: email,
      usuario: usuario_cadastro,
      senha: senha
    };
  
    const json = JSON.stringify(usuario);  
    
    fetch('http://localhost:5000/cadastrologin', {
    method: 'POST',
    body: json,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => {
        if(response.status === 201){
            document.getElementById('resultado-cadastro').innerHTML = 'Cadastro realizado com sucesso!';

            document.getElementById('nome-cadastro').value = '';
            document.getElementById('email-cadastro').value = '';
            document.getElementById('usuario-cadastro').value = '';
            document.getElementById('senha-cadastro').value = '';
        }
        else if(response.status === 400){
            response.json().then(function(object) {
                document.getElementById('resultado-cadastro').innerHTML = object.erro;
              })
        }
        else{
            document.getElementById('resultado-cadastro').innerHTML = 'Erro ao cadastrar o usuário';
        }
    })
    .catch(error => {
        document.getElementById('resultado-cadastro').innerHTML = 'Erro, tente novamente mais tarde';
    })
  };

async function login_usuario(){
    const usuario_cadastro = document.getElementById('usuario-login').value.trim();
    const senha = document.getElementById('senha-login').value;
    
    const usuario = {
      usuario: usuario_cadastro,
      senha: senha
    };
  
    const json = JSON.stringify(usuario);  
    
    fetch('http://localhost:5000/login', {
    method: 'POST',
    body: json,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then(async (response) => {
        if(response.status === 200){
            let body = await response.json();
            localStorage.setItem('usuario-logado', body.usuario);
            //fechar modal
            window.location.href = 'index.html';
        }
        else if(response.status === 401){
            document.getElementById('resultado-login').innerHTML = 'Usuário e/ou senha inválidos';
        }
        else{
            response.json().then(function(object) {
                document.getElementById('resultado-login').innerHTML = object.erro;
              })
        }
    })
    .catch(error => {
        console.log('Erro, tente novamente mais tarde');
        document.getElementById('resultado-login').innerHTML = 'Erro, tente novamente mais tarde';
    })
  };

function deslogar_usuario(){
    localStorage.removeItem('usuario-logado');
    window.location.href = 'index.html';
  };