import { areTinyEditorsLoaded } from "./global.js";

//? loading spinner
// implementa o loading no local indicado
export function showLoading(target, position, modal) {
  let spinner = `<div class="spinner-content ${modal ? "modal" : ""}">
  <div class="spinner"></div></div>`;
  target.insertAdjacentHTML(position, spinner);
}

// remove o loading da pagina
export function removeLoading() {
  let isLoading = document.querySelector(".spinner-content");
  isLoading ? isLoading.remove() : "";
}

// inicia o loading na pagina
export function initLoading() {
  let mainContent = document.querySelector("main");
  let etapa = mainContent.dataset.etapa;
  if (etapa == "orcamento") {
    let container = mainContent.querySelector(".wrapper");
    showLoading(mainContent, "beforeend");
    let checkInterval = setInterval(function () {
      if (areTinyEditorsLoaded()) {
        clearInterval(checkInterval);
        removeLoading();
        container.classList.remove("hidden");
      }
    }, 100);
  }
}
