async function cadastro_newsletter(){
    const nome = document.getElementById('nome-newsletter').value;
    const email = document.getElementById('email-newsletter').value;
    const telefone = document.getElementById('tel-newsletter').value;
    
    const usuario = {
      nome: nome,
      email: email,
      telefone: telefone
    };
  
    const json = JSON.stringify(usuario);  
    
    fetch('http://localhost:5000/cadastronewsletter', {
    method: 'POST',
    body: json,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => {
        if(response.status === 201){
            console.log('Cadastro realizado com sucesso!');            
            document.getElementById('resultado-form').innerHTML = 'Cadastro realizado com sucesso!';

            document.getElementById('nome-newsletter').value = '';
            document.getElementById('email-newsletter').value = '';
            document.getElementById('tel-newsletter').value = '';
        }
        else if(response.status === 400){
            response.json().then(function(object) {
                document.getElementById('resultado-form').innerHTML = object.erro;
              })
        }
        else{
            console.log('Erro ao cadastrar');
            document.getElementById('resultado-form').innerHTML = 'Erro ao cadastrar';
        }
    })
    .catch(error => {
        console.log('Erro, tente novamente mais tarde');
        document.getElementById('resultado-form').innerHTML = 'Erro, tente novamente mais tarde';
    })
  };  

  function formatar(mascara, documento) {
    let i = documento.value.length;
    let saida = '#';
    let texto = mascara.substring(i);
    while (texto.substring(0, 1) != saida && texto.length ) {
      documento.value += texto.substring(0, 1);
      i++;
      texto = mascara.substring(i);
    }
  }