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
            console.log('Cadastro realizado com sucesso!');            
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
            console.log('Erro ao cadastrar');
            document.getElementById('resultado-cadastro').innerHTML = 'Erro ao cadastrar o usuário';
        }
    })
    .catch(error => {
        console.log('Erro, tente novamente mais tarde');
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
            console.log('Login realizado com sucesso!'); 
            //document.getElementById('resultado-login').innerHTML = 'usuário logado!';
            localStorage.setItem("usuario-logado", body.usuario)
            //fechar modal
            //alterar botão para logout
        }
        else if(response.status === 400){
            response.json().then(function(object) {
                document.getElementById('resultado-login').innerHTML = object.erro;
              })
        }
        else{
            console.log('Erro ao fazer login');
            document.getElementById('resultado-login').innerHTML = 'Usuário e/ou senha inválidos';
        }
    })
    .catch(error => {
        console.log('Erro, tente novamente mais tarde');
        document.getElementById('resultado-login').innerHTML = 'Erro, tente novamente mais tarde';
    })
  };