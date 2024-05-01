//? module import
import NavbarAnimation from "./navbar.js";
import Conta from "./contas.js";
import initCalculadora from "./calculadora.js";
import Autenticacao from "./autenticacao.js";
import Comentario from "./comentarios.js";

//? navbar
const navbar = new NavbarAnimation(".navbar", ".navlinks", ".menu-button");
navbar.initNavbarAnimation();

//? contas e valores
const conta = new Conta(
  ".grupo-contas",
  ".uma-conta",
  ".conta-input",
  ".adicionar",
  ".remover"
);
conta.initConta();

//? autenticacao
const autenticacao = new Autenticacao("#login-button", "#logout-button");
autenticacao.initAutenticacao();

const comentario = new Comentario(".comentario");
comentario.initComentario();

//? inicia calculadora
initCalculadora();
