// atraso de execucao de funcoes
export function debounce(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}

// verifica se todos os editores do tiny estao devidamente carregados
export function areTinyEditorsLoaded() {
  var editors = tinymce.get();
  for (let i = 0; i < editors.length; i++) {
    if (!editors[i].initialized) {
      return false;
    }
  }
  return true;
}
