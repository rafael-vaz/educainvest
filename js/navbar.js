import { debounce } from "./global.js";
//? navbar animation
export default class navbarAnimation {
  constructor(navbar, menu, menuButton) {
    this.navbar = document.querySelector(navbar);
    this.menu = this.navbar.querySelector(menu);
    this.menuButton = this.navbar.querySelector(menuButton);
    this.hasAnimation = this.navbar.dataset.animation;

    // callbacks binds
    this.checkNavbar = this.checkNavbar.bind(this);
  }

  // inicia a funcionalidade de animacao
  initNavbarAnimation() {
    this.listenerMenuButton();
    this.hasAnimation == "true" ? this.listenerNavbar() : "";
  }

  // listener para altura da pagina
  listenerNavbar() {
    let debouncedcheck = debounce(this.checkNavbar, 200);
    window.addEventListener("scroll", debouncedcheck);
  }

  // verifica status da pagina e implementa a animacao
  checkNavbar() {
    let navbarRect = this.navbar.getBoundingClientRect();
    let distance = Math.abs(parseInt(navbarRect.top));
    let height = parseInt(navbarRect.height);
    let animate = this.navbar.classList.contains("animation");
    let scrollPage = parseInt(window.scrollY);
    if (distance >= height && !animate) {
      document.body.classList.add("nav-animation");
      this.navbar.classList.add("animation");
    } else if (scrollPage == 0 && animate) {
      document.body.classList.remove("nav-animation");
      this.navbar.classList.remove("animation");
    }
  }

  // toggle menu mobile
  toggleMenu() {
    this.menu.classList.toggle("visible");
  }

  // listener para botao do menu mobile
  listenerMenuButton() {
    this.menuButton.addEventListener("click", () => {
      this.toggleMenu();
    });
    window.addEventListener("click", (event) => {
      let target = event.target;
      if (!this.menuButton.contains(target) && !this.menu.contains(target)) {
        this.menu.classList.remove("visible");
      }
    });
  }
}
