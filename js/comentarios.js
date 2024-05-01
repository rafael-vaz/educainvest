import { tinyConfig } from "./tinyconfig.js";
//? caixa de comentarios
export default class Comentario {
  constructor(elements) {
    this.elements = document.querySelectorAll(elements);
    this.config = Object.assign(tinyConfig, {
      init_instance_callback: this.initEditor,
    });
    // callbacks binds
    this.initEditor = this.initEditor.bind(this);
    this.listenerComentario = this.listenerComentario.bind(this);
  }

  // inicia funcionalidades dos comentarios
  initComentario() {
    let comentarios = JSON.parse(localStorage.getItem("comentarios"));
    this.elements?.forEach((element) => {
      let groupID = element.closest(".grupo-contas").dataset.categoria;
      let comentario = comentarios
        ? this.getSavedComentario(groupID, comentarios)
        : "";
      this.buildEditor(element, comentario);
    });
  }

  // realiza o build do editor e implementa o conteudo
  async buildEditor(element, content) {
    await tinymce.init(
      Object.assign(
        { target: element },
        {
          setup: function (editor) {
            editor.on("init", function (e) {
              editor.setContent(`${content}`);
            });
          },
        },
        this.config
      )
    );
  }

  // listener para os comentarios
  listenerComentario(editorID) {
    let editor = document.getElementById(editorID);
    let comentario = tinymce.get(editorID).getContent();
    let grupo = editor.closest(".grupo-contas").dataset.categoria;
    let categoria = editor.closest(".quadro-padrao").dataset.indice;
    this.setComentario(categoria, grupo, comentario);
  }

  // salva os comentarios no local-storage
  setComentario(category, groupName, comment) {
    let savedComentarios = JSON.parse(localStorage.getItem("comentarios"));
    let defaultComentarios = {
      renda: {
        rendimentos: "",
        despesas: "",
      },
    };
    let comentarios = savedComentarios ? savedComentarios : defaultComentarios;
    switch (category) {
      //? indices de liquidez
      case "renda":
        switch (groupName) {
          // contas
          case "rendimentos":
            comentarios.renda.rendimentos = {
              id: groupName,
              comentario: comment,
            };
            break;
          case "despesas":
            comentarios.renda.despesas = {
              id: groupName,
              comentario: comment,
            };
            break;
        }
        break;
    }
    // armazena no local-storage
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
  }

  // funcao de callback para o build do editor
  initEditor = (editor) => {
    editor.on("input", (e) => {
      this.listenerComentario(editor.id);
    });
    editor.on("change", (e) => {
      this.listenerComentario(editor.id);
    });
  };

  //? utilitarios
  // retorna um comentarios atraves do id
  getSavedComentario(id, comentarios) {
    let texto = "";
    for (const categoria in comentarios) {
      const grupos = comentarios[categoria];
      for (const grupo in grupos) {
        grupos[grupo].id == id ? (texto = grupos[grupo].comentario) : "";
      }
    }
    return texto;
  }
}
