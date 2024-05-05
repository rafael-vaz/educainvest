//? autenticacao
export default class Autenticacao {
  constructor(loginButton, logoutButton) {
    this.loginButton = document.querySelector(loginButton);
    this.logoutButton = document.querySelector(logoutButton);

    // callbacks binds
    this.showLoginBox = this.showLoginBox.bind(this);
    this.showSignUpBox = this.showSignUpBox.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // implementa o quadro de login na pagina
  showLoginBox() {
    const boxHTML = `
  <div class="modal" data-type='login'>
  <div class="quadro-modal">
    <h3>Realizar Login</h3>
    <form class='um-form' action="" onsubmit="event.preventDefault(); login_usuario()">
      <div id="resultado-login"></div>    
      <label for="usuario">Usuário</label>
      <input type="text" name="usuario" id="usuario-login" placeholder="nome do usuário">
      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha-login" placeholder="digite sua senha">
      <div class="grid col-1by1">
        <button class="button" id="acessar">
          Acessar conta
        </button>
        <button class="button" id="cancelar">
          Cancelar
        </button>
      </div>
    </form>
    <span>Não possui conta? <a class="cadastro" href="">Cadastre-se</a></span>
  </div>
</div>    
    `;
    document.body.insertAdjacentHTML("beforeend", boxHTML);
    let cancelarBtn = document.querySelector(
      ".modal[data-type='login'] #cancelar"
    );
    cancelarBtn.addEventListener("click", this.closeModal);
    this.listenerSignUp();
  }

  // listener para o login
  listenerLogin() {
    this.loginButton.addEventListener("click", this.showLoginBox);
  }

  // implementa o quadro de cadastro na pagina
  showSignUpBox(event) {
    this.closeModal(event);
    const boxHTML = `<div class="modal" data-type='cadastro'>
    <div class="quadro-modal">
      <h3>Criar Cadastro</h3>
      <form class='um-form' action="" onsubmit="event.preventDefault(); cadastro_usuario()">
        <div id="resultado-cadastro"></div>  
        <label for="nome">Nome</label>
        <input type="text" name="nome" id="nome-cadastro" placeholder="ex: João da Silva">
        <label for="usuario">E-mail</label>
        <input type="email" name="email" id="email-cadastro" placeholder="ex: joao.silva@teste.com">
        <label for="usuario">Usuário</label>
        <input type="text" name="usuario" id="usuario-cadastro" placeholder="ex: joao.silva">
        <label for="senha">Senha</label>
        <input type="password" name="senha" id="senha-cadastro" placeholder="digite sua senha">
        <div class="grid col-1by1">
          <button class="button" id="confirmar">
            Confirmar
          </button>
          <button class="button" id="cancelar">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>`;
    document.body.insertAdjacentHTML("beforeend", boxHTML);
    let cancelarBtn = document.querySelector(
      ".modal[data-type='cadastro'] #cancelar"
    );
    cancelarBtn.addEventListener("click", this.closeModal);
  }

  // listener para cadastro
  listenerSignUp() {
    let cadastro = document.querySelector(
      ".modal[data-type='login'] .cadastro"
    );
    cadastro.addEventListener("click", this.showSignUpBox);
  }

  // fecha todos os modais
  closeModal(event) {
    event?.preventDefault();
    let modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      modal?.remove();
    });
  }

  // inicia as funcionalidades de autenticacao
  initAutenticacao() {
    if (this.loginButton && this.logoutButton) {
      this.listenerLogin();
    }
  }
}
