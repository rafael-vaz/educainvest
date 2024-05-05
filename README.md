# __Educainvest__ 💰
#### Organize as suas finanças enquanto aprende.
---

## Documentação do Aplicativo Educainvest

### INTRODUÇÃO

Bem-vindo à documentação do Aplicativo Educainvest. Esta documentação fornecerá informações essenciais para usuários e desenvolvedores interessados em entender e utilizar nosso aplicativo.

### PÚBLICO-ALVO

Esta documentação destina-se a:

•	Usuários finais que desejam aprender a usar o aplicativo Educainvest.

### FUNCIONALIDADES PRINCIPAIS

O Aplicativo Educainvest oferece funcionalidades essenciais para o gerenciamento financeiro pessoal e de investimentos. Algumas das principais funcionalidades incluem:

1.	__Home:__ Permite aos usuários acessar um resumo das funcionalidades oferecidas pelo aplicativo, sendo elas: educação financeira, investimentos e análise de dividas. Além disso, o usuário poderá preencher o formulário para receber dicas e novidades.

2.	__Investimentos:__ Fornecemos dicas importantes para ajudar a investir com segurança.

3.	__Finanças:__ Oferece ao usuário a capacidade de calcular e gerenciar seu orçamento familiar. Neste menu, o usuário insere seus rendimentos mensais, despesas mensais e o aplicativo traz o totalizador da renda mensal.

4.	__Sobre:__ Neste menu o usuário conhece o objetivo da empresa, bem como os serviços prestados pelo aplicativo.

5.	__Segurança e Privacidade:__ Garantimos a segurança das informações financeiras dos usuários.

### INSTRUÇÕES DE USO

### Cadastro receba dicas e novidades

1.	__Nome Completo:__ Preencha seu nome completo neste campo. 

2.	__Email:__ Insira um endereço de e-mail válido. Certifique-se de que seja um e-mail ativo, pois é por meio dele que você receberá nossas dicas e atualizações.

3.	__Telefone:__ Insira seu número de telefone. Certifique-se de fornecer um número ativo para que possamos entrar em contato se necessário.

4.	__Cadastrar:__ Após preencher todos os campos, clique no botão "CADASTRAR" para enviar seus dados.

### Cadastro no site

1. Clique no botão "Login" e em seguida em "Cadastre-se".

2.	__Nome Completo:__ Preencha seu nome completo neste campo. 

3.	__Email:__ Insira um endereço de e-mail válido. Certifique-se de que seja um e-mail ativo.

4.	__Usuário:__ Insira seu nome de usuário. É por meio dele que será efetuado o login.

4.	__Senha:__ Crie uma senha segura.

5. Após preencher todos os campos, clique no botão "CONFIRMAR" para enviar seus dados.

### lOGIN

1. Clique no botão "Login".

2.	__Usuário:__ Digite seu nome de usuário.

3.	__Senha:__ Digite sua senha.

4. Clique no botão "ACESSAR CONTA" e, se o usuário e senha estiverem corretos, o login será efetuado.

### Organize suas finanças

__Rendimentos Mensais__

1. Acesse o menu __Finanças__

2.	No campo "Conta", insira um nome descritivo para o rendimento, como "Salário", "Aluguel", ou "Investimentos".

3.	No campo "Valor", insira o valor correspondente ao rendimento. Utilize números inteiros ou decimais, como "2000.00".

4.	Clique em "+" após preencher os campos. Isso registrará a conta de rendimento. Você pode adicionar várias contas de rendimento, se necessário.

5.	Clique em "-" para excluir uma conta. Você pode excluir várias contas de rendimento, se necessário.

__Despesas Mensais__

1. Acesse o menu __Finanças__

2.	No campo "Conta", insira um nome descritivo para a despesa, como "Aluguel", "Água" ou “Luz”.

3.	No campo "Valor", insira o valor correspondente ao rendimento. Utilize números inteiros ou decimais, como "2000.00".

4.	Clique em "+" após preencher os campos. Isso registrará a conta de despesa. Você pode adicionar várias contas de rendimento, se necessário.

5.	Clique em "-" para excluir uma conta. Você pode excluir várias contas de despesa, se necessário.

6.	Total

A seção "TOTAL" mostrará a soma de todas as despesas registradas.

__Renda Total:__

A seção "RENDA TOTAL" calculará automaticamente sua renda total. Ela é calculada subtraindo a soma das despesas da soma dos rendimentos. Você verá o valor líquido aqui.


### APRESENTAÇÃO

A apresentação do projeto pode ser vista no vídeo "Educainvest-apresentação.mp4" ou pelo [Youtube](https://youtu.be/3Tl0JTTgDLk).


## Requisitos para rodar o projeto:

- MySql
- Node.js
- VSCode com a extensão Live Server


### Instalação do MySql:

1. Fazer o download da versão 8.0 no site [Mysql](https://dev.mysql.com/downloads/windows/installer/8.0.html).

2. Durante a instalação, na tela "Choosing a Setup Type", selecionar a opção "Full"

3. Na tela "Accounts and Roles", defina uma senha para o usuário root

4. Na tela "Connect to Server", digite sua senha root e clique em check para continuar


### Instalação do Node.js:

1. Fazer download do Node.js no [site](https://nodejs.org/en) (é indicado baixar a versão que está escrito "LTS").


## Para rodar o projeto:

1. Popular o banco:

- Abrir o workbench do MySql, copiar lá o conteúdo do arquivo api/scriptbanco.txt e clicar na seta para rodar o código.
Esse script irá criar a base de dados que será utilizada, irá criar um usuário padronizado para acessar esse banco (assim, para esse primeiro momento, o usuário e senha se mantém fixo no código para fins de testes) e irá criar a tabela que será utilizada para cadastrar os usuários que desejam receber novidades e também a tabela de cadastro de usuários para efetuar o login.

2. Rodar a api:

- Abrir o prompt dentro da pasta api;

- Digitar npm install;

- Digitar node index.js;

Deverá aparece a mensagem de "API funcionando".
Obs: Manter a janela do prompt aberta enquanto executa o aplicativo.

3. Executar o Educainvest

- Abrir a pasta do projeto dentro do VSCode.

- Clicar no botão "Go Live" (canto inferior direito) para executar o projeto.


## Suporte

Se você tiver dúvidas ou precisar de suporte adicional, entre em contato com nossa equipe de suporte.

## Conclusão

Esperamos que esta documentação tenha fornecido informações úteis sobre o Aplicativo Educainvest. Este é um guia inicial para ajudar os usuários a aproveitar ao máximo nosso aplicativo. Se você tiver alguma dúvida adicional ou precisar de assistência, não hesite em entrar em contato com nossa equipe de suporte. Obrigado por escolher o Aplicativo Educainvest para suas necessidades financeiras.

---
__Desenvolvedores do projeto__:  

Grupo 02:

Ana Lucia Rizzi Fiori  
Gabriela Rodriges  
Joelma Silva Alves  
Kevin Dornelles Machado  
Milena de Almeida Santos  
Rafael Dos Santos Vitorio  
Rafael Ferreira Vaz  
Silvio Vinicius Cruz Mascarenhas Leite  
