let pacientes = [];
let usuarioLogado = {};

function cadastrarPaciente() {
    let nomeInput = document.querySelector("#nomeInput");
    let enderecoInput = document.querySelector("#enderecoInput");
    let telefoneInput = document.querySelector("#telefoneInput");
    let inputTipoAtendimento = document.querySelector("#inputTipoAtendimento");
    let inputObservacoes = document.querySelector("#inputObservacoes");

    let paciente = {
        nome: nomeInput.value,
        endereco: enderecoInput.value,
        telefone: telefoneInput.value,
        tipoAtendimento: inputTipoAtendimento.value,
        observacoes: inputObservacoes.value
    };
    pacientes = JSON.parse(localStorage.getItem("pacientes"));
    if(pacientes == null) {
        pacientes = [];
    }
    pacientes.push(paciente);
    window.localStorage.setItem("pacientes", JSON.stringify(pacientes));
    alert("Paciente cadastrado com sucesso!");
    window.location = "index.html";
}

function verificarUsuarioLogado() {
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if(usuarioLogado == null) {
        alert("Efetue o login primeiro");
        window.location = "tela_login.html";
    }
}

verificarUsuarioLogado();