//? contas e valores
export default class Conta {
  constructor(grupoContas, contas, campos, addButton, removeButton) {
    this.grupoContasElements = document.querySelectorAll(grupoContas);
    this.grupoContas = grupoContas;
    this.contas = contas;
    this.campos = campos;
    this.addButton = addButton;
    this.removeButton = removeButton;
    this.hasContas = document.querySelectorAll(contas).length > 1;
    this.mobileButtons = `
    <div class="botoes-mobile">
    <button class="adicionar">Adicionar</button>
    <button class="remover">Remover</button>
    </div>    
    `;
    // callbacks binds
    this.setMobileButtons = this.setMobileButtons.bind(this);
    this.addNewConta = this.addNewConta.bind(this);
    this.removeConta = this.removeConta.bind(this);
    this.getCurrentValues = this.getCurrentValues.bind(this);
    this.checkFormatValue = this.checkFormatValue.bind(this);
  }

  // inicia funcionalidades das contas
  initConta() {
    if (this.grupoContasElements && this.hasContas) {
      this.checkSavedValues();
      this.checkMobileButtons();
      this.listenerCheckValue();
      this.listenerNameConta();
      this.listenerControlButtons();
    }
  }

  // verifica implementacao dos botoes mobile
  checkMobileButtons() {
    this.setMobileButtons();
    window.addEventListener("resize", this.setMobileButtons);
  }

  // implementa botoes mobile
  setMobileButtons() {
    if (window.matchMedia("(max-width: 600px)").matches) {
      this.grupoContasElements?.forEach((grupo) => {
        if (!grupo.querySelector(".botoes-mobile")) {
          let total = grupo.querySelector(".total-grupo");
          total.insertAdjacentHTML(`beforebegin`, this.mobileButtons);
        }
      });
      this.resetListenerControl();
    } else {
      let activeMobileButtons = document.querySelectorAll(".botoes-mobile");
      activeMobileButtons?.forEach((button) => {
        button.remove();
      });
    }
  }

  // listener de formatacao para os inputs de valor
  listenerCheckValue() {
    let valores = document.querySelectorAll(
      `${this.campos}[data-type="valor"]`
    );
    valores.forEach((valor) => {
      valor.addEventListener("input", this.checkFormatValue);
    });
  }

  // reseta os listeners de formatacao de valores
  resetListenerValue() {
    let valores = document.querySelectorAll(
      `${this.campos}[data-type="valor"]`
    );
    valores.forEach((valor) => {
      valor.removeEventListener("input", this.checkFormatValue);
    });
    this.listenerCheckValue();
  }

  // listener para os nome da conta
  listenerNameConta() {
    let nomes = document.querySelectorAll(`${this.campos}[data-type="conta"]`);
    nomes.forEach((nome) => {
      nome.addEventListener("input", this.checkFormatValue);
    });
  }

  // reseta listener para os nome da conta
  resetListenerNameConta() {
    let nomes = document.querySelectorAll(`${this.campos}[data-type="conta"]`);
    nomes.forEach((nome) => {
      nome.removeEventListener("input", this.checkFormatValue);
    });
    this.listenerNameConta();
  }

  // verifica formatacao dos valores de conta
  checkFormatValue(event) {
    let input = event.target;
    let valor = input.value;
    let grupo = input.closest(this.grupoContas);
    let nomeGrupo = grupo.dataset.categoria;
    if (input.dataset.type == "valor") {
      input.value = this.formatValue(valor);
    } else if (input.dataset.type == "conta") {
      input.value = this.formatName(valor);
    }
    this.getCurrentValues(grupo, nomeGrupo);
  }

  // realiza formatacao de nomes
  formatName(name) {
    name = name.replace(/^\s+/g, "");
    name = name.replace(/\d/g, "");
    return name;
  }

  // realiza formatacao de valores
  formatValue(valor) {
    // remove todos os caracteres nao numericos, exceto ".,"
    valor = valor.replace(/[^\d,.]/g, "");

    // remove todos os valores após a virgula
    valor = valor.replace(/\,\d+/g, "");

    // remove espacos em branco
    valor = valor.replace(/\s/g, "");

    // remove todos os sinais de pontos ou virgulas existentes
    valor = valor.replace(/\./g, "");
    valor = valor.replace(/\,/g, "");

    // formata o numero com um ponto a cada tres digitos
    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return valor;
  }

  // adiciona os listeners para os botoes de controle
  listenerControlButtons() {
    let addButtons = document.querySelectorAll(this.addButton);
    let removeButtons = document.querySelectorAll(this.removeButton);

    // set listeners add
    addButtons.forEach((button) => {
      button.addEventListener("click", this.addNewConta);
    });
    // set listeners remove
    removeButtons.forEach((button) => {
      button.addEventListener("click", this.removeConta);
    });
  }

  // reseta os listeners de controle
  resetListenerControl() {
    let addButtons = document.querySelectorAll(this.addButton);
    let removeButtons = document.querySelectorAll(this.removeButton);

    // reset listeners add
    addButtons.forEach((button) => {
      button.removeEventListener("click", this.addNewConta);
    });
    // reset listeners remove
    removeButtons.forEach((button) => {
      button.removeEventListener("click", this.removeConta);
    });
    this.listenerControlButtons();
  }

  // adiciona nova conta
  addNewConta(event) {
    let target = event.target;
    let isMobile = !!target.closest(".botoes-mobile");
    let grupo = target.closest(this.grupoContas);
    let allLines = grupo.querySelectorAll(this.contas);
    let linha = isMobile
      ? allLines[allLines.length - 1]
      : target.closest(this.contas);
    let nomeGrupo = grupo.dataset.categoria;
    let clone = linha.cloneNode(true);
    let contas = clone.querySelectorAll(this.campos);
    contas.forEach((conta, index) => {
      conta.value = "";
      conta.removeAttribute("disabled");
    });
    linha.insertAdjacentElement("afterend", clone);
    this.resetListenerControl();
    this.resetListenerValue();
    this.resetListenerNameConta();
    this.getCurrentValues(grupo, nomeGrupo);
  }

  // remove conta
  removeConta(event) {
    let target = event.target;
    let isMobile = !!target.closest(".botoes-mobile");
    let grupo = target.closest(this.grupoContas);
    let nomeGrupo = grupo.dataset.categoria;
    let activeContas = grupo.querySelectorAll(this.contas);
    let linha = isMobile
      ? activeContas[activeContas.length - 1]
      : target.closest(this.contas);
    if (activeContas.length > 1) {
      linha?.remove();
    }
    this.resetListenerControl();
    this.resetListenerValue();
    this.resetListenerNameConta();
    this.getCurrentValues(grupo, nomeGrupo);
  }

  // obtem os valores inseridos
  getCurrentValues(group, groupName) {
    let etapa = document.querySelector("main").dataset.etapa;
    let linhas = group.querySelectorAll(`${this.contas}`);
    let totalGrupo = group.querySelector(`.total-grupo .valor`);
    let nome, valor, id;
    let total = 0;
    let contas = Array.from(linhas).map((conta) => {
      nome = conta.querySelector(`.conta-input[data-type="conta"]`).value;
      valor = conta.querySelector(`.conta-input[data-type="valor"]`).value;
      valor = valor.replace(/\./g, "");
      valor = valor && valor != NaN && valor != "-" ? parseInt(valor) : 0;
      total += valor;
      totalGrupo.value = this.formatValue(total.toString());
      id = conta.dataset.id ? conta.dataset.id : "";
      return { id, nome, valor };
    });
    switch (etapa) {
      case "orcamento":
        this.setOrcamento(groupName, contas, total);
        break;
    }
  }

  // verificar os valores salvos
  checkSavedValues() {
    let etapa = document.querySelector("main").dataset.etapa;
    let grupos, categorias, grupo, contas, orcamento, totalGrupo;
    switch (etapa) {
      case "orcamento":
        orcamento = JSON.parse(localStorage.getItem("orcamento"));
        if (orcamento) {
          grupos = document.querySelectorAll(this.grupoContas);
          categorias = Array.from(grupos).map((grupo) => {
            return grupo.dataset.categoria;
          });
          categorias?.forEach((categoria) => {
            switch (categoria) {
              //? grupo orcamento
              // rendimentos
              case "rendimentos":
                grupo = document.querySelector(
                  `[data-categoria='${categoria}']`
                );
                contas = orcamento.rendimentos.contas;
                break;
              // despesas
              case "despesas":
                grupo = document.querySelector(
                  `[data-categoria='${categoria}']`
                );
                contas = orcamento.despesas.contas;
                break;
            }
            if (contas?.length > 0) {
              totalGrupo = grupo.querySelector(".total-grupo");
              grupo.querySelector(".uma-conta").remove();
              this.buildContas(contas, totalGrupo, "padrao");
            }
          });
        }
        break;
        demonstracao = JSON.parse(localStorage.getItem("demonstracao"));
        if (demonstracao) {
          grupos = document.querySelectorAll(this.grupoContas);
          categorias = Array.from(grupos).map((grupo) => {
            return grupo.dataset.categoria;
          });
        }
        categorias?.forEach((categoria) => {
          switch (categoria) {
            case "lucro-bruto":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = demonstracao.grupos.lucroBruto.contas;
              break;

            case "lucro-previo-rf":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = demonstracao.grupos.lucroAntesDoRF.contas;
              break;

            case "lucro-previo-ir":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = demonstracao.grupos.lucroAntesDoIR.contas;
              break;

            case "lucro-liquido":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = demonstracao.grupos.lucroLiquido.contas;
              break;
          }
          if (contas?.length > 0) {
            totalGrupo = grupo.querySelector(".total-grupo");
            grupo.querySelector(".uma-conta").remove();
            this.buildContas(contas, totalGrupo, "padrao", etapa);
          }
        });
        break;

        indicadores = JSON.parse(localStorage.getItem("indicadores"));
        if (indicadores) {
          grupos = document.querySelectorAll(this.grupoContas);
          categorias = Array.from(grupos).map((grupo) => {
            return grupo.dataset.categoria;
          });
        }
        categorias?.forEach((categoria) => {
          switch (categoria) {
            //? grupo liquidez
            case "liquidez-corrente":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.liquidez.liquidezCorrente.contas;
              break;
            case "liquidez-seca":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.liquidez.liquidezSeca.contas;
              break;
            case "liquidez-imediata":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.liquidez.liquidezImediata.contas;
              break;
            case "liquidez-geral":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.liquidez.liquidezGeral.contas;
              break;
            //? grupo rotatividade
            case "rotacao-estoques":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.rotatividade.rotacaoEstoques.contas;
              break;
            case "indice-medio-estoques":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.rotatividade.indiceMedioEstoques.contas;
              break;
            case "prazo-medio-cobranca":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.rotatividade.prazoMedioCobranca.contas;
              break;
            case "prazo-medio-pagamento":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.rotatividade.prazoMedioPagamento.contas;
              break;
            //? grupo financeiros
            case "margem-liquida":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.financeiros.margemLiquida.contas;
              break;
            case "retorno-ativos":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.financeiros.retornoSobreAtivos.contas;
              break;
            case "retorno-investimento":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.financeiros.retornoSobreInvestimento.contas;
              break;
            case "retorno-patrimonio-liquido":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.financeiros.retornoSobrePL.contas;
              break;
            case "grau-alavancagem-financeira":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.financeiros.grauAlavancagemFinanceira.contas;
              break;
            //? grupo endividamento
            case "composicao-endividamento":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.endividamento.composicaoEndividamento.contas;
              break;
            case "composicao-endividamento-curto-prazo":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas =
                indicadores.endividamento.composicaoEndividamentoCP.contas;
              break;
            case "grau-imobilizacao-pl":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.endividamento.grauImobilizacaoPL.contas;
              break;
            case "grau-imobilizacao-rnc":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.endividamento.grauImobilizacaoRNC.contas;
              break;
            //? grupo valorizacao
            case "ebitda":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.valorizacao.ebitda.contas;
              break;
            case "eva":
              grupo = document.querySelector(`[data-categoria='${categoria}']`);
              contas = indicadores.valorizacao.eva.contas;
              break;
          }
          if (contas?.length > 0) {
            totalGrupo = grupo.querySelector(".total-grupo");
            grupo.querySelectorAll(".uma-conta").forEach((conta) => {
              conta?.remove();
            });
            this.buildContas(contas, totalGrupo, "fixo", etapa);
          }
        });
        break;
    }
  }

  // gera novos campos de conta
  buildContas(contas, target, tipo, etapa) {
    let grupo = target.closest(this.grupoContas);
    let nomeGrupo = grupo.dataset.categoria;
    let controlButtons = `
<div class="botoes">
<button class="adicionar"></button>
<button class="remover"></button>
</div>
`;
    contas.forEach((conta, index) => {
      target.insertAdjacentHTML(
        "beforebegin",
        `
      <div class="uma-conta ${etapa == "indicadores" ? "dual" : ""}" ${
          conta.id ? `data-id='${conta.id}'` : ""
        }>
    <input class="conta-input" data-type="conta" type="text" placeholder="nome da conta" value="${
      conta.nome
    }">
    <input class="conta-input" data-type="valor" type="text" pattern="[0-9,.]*" maxlength="12" placeholder="0"
    value="${conta.valor == 0 ? "" : conta.valor}">
    ${tipo == "padrao" ? controlButtons : ""}
     </div>
      `
      );
    });
    this.resetListenerControl();
    this.resetListenerValue();
    this.resetListenerNameConta();
    this.initFormat();
    this.getCurrentValues(grupo, nomeGrupo);
  }

  // formatacao inicial de valores
  initFormat() {
    let valores = document.querySelectorAll(".conta-input[data-type='valor']");
    valores.forEach((valor) => {
      valor.value = this.formatValue(valor.value);
    });
  }

  // ? orcamento
  // salva os valores do orcamento
  setOrcamento(groupName, contas, total) {
    let savedOrcamento = JSON.parse(localStorage.getItem("orcamento"));
    let defaultOrcamento = {
      rendimentos: { total: 0 },
      despesas: { total: 0 },
      total: 0,
    };
    let orcamento = savedOrcamento ? savedOrcamento : defaultOrcamento;

    switch (groupName) {
      case "rendimentos":
        let rendimentos = {
          contas,
          total,
        };
        orcamento.rendimentos = rendimentos;
        break;

      case "despesas":
        let despesas = {
          contas,
          total,
        };
        orcamento.despesas = despesas;
        break;
    }
    // recebe os totais de rendimentos e despesas
    orcamento = this.setTotalOrcamento(orcamento);
    // armazena no local-storage
    localStorage.setItem("orcamento", JSON.stringify(orcamento));
  }

  // retorna o total dos rendimentos
  setTotalOrcamento(orcamento) {
    let total = document.querySelector(
      ".quadro-padrao[data-orcamento='true'] .total-final .valor"
    );
    // total rendimentos
    orcamento.total = orcamento.rendimentos.total - orcamento.despesas.total;
    total.value = this.formatValue(orcamento.total.toString());
    return orcamento;
  }

  //? utilitarios
  // retorna valor de uma conta pelo id
  getContaValue(id, contas) {
    let valor;
    contas.forEach((conta) => {
      if (conta.id == id) {
        valor = conta.valor;
      }
    });
    return valor;
  }

  // formata valores decimais
  formatDecimalValues(value) {
    let result;
    result =
      value && value != NaN && value != "Infinity"
        ? parseFloat(value).toFixed(1)
        : 0;
    return result;
  }

  // retorna o valor total de um grupo de contas
  getTotalGrupo(grupo) {
    let inputs = grupo.querySelectorAll(`.conta-input[data-type="valor"]`);
    let valor;
    let total = 0;
    inputs.forEach((input) => {
      valor = input.value;
      valor = valor.replace(/\./g, "");
      valor = valor && valor != NaN && valor != "-" ? parseInt(valor) : 0;
      total += valor;
    });
    return total;
  }
}
