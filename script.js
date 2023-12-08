let date = new Date();
let ano = date.getFullYear();
let mes = date.getMonth() + 1;
let objetoDivDiasMes = document.querySelector('.diasMes');
let objetoModal = document.querySelector('.modal');
let objetoConteudoModal = document.querySelector('.conteudoModal');
let diaClick = 0;
let agendamentos = [];
let usuarioLogado = {};
let pacientes = [];


function diasDoMes(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}

function trocarData() {
    let inputMes = document.querySelector('#mesInput').value;
    let inputAno = document.querySelector('#anoInput').value;
    if(inputMes > 12 || inputMes < 1) {
        alert("Mes deve ser menor que 12 e maior que 1");
    } else if(inputAno < 1970) {
        alert("Mes deve ser maior que 1970");
    } else {
        date = new Date(String(inputAno + " " + inputMes + " 1"));
        mes = date.getMonth() + 1;
        ano = date.getFullYear();
        objetoDivDiasMes.innerHTML = '';
        preenchimentoCalendario();
    }
}

function diaAtualMes(mes, ano, dia) {
    let dataString = String(ano + " " + mes + " " + dia);
    return new Date(dataString).getDay();
}

function fecharModal() {
    objetoConteudoModal.innerHTML = '';
    objetoModal.style.display = "none";

}

function clickBoxDia(event, diaClickBox) {
    objetoModal.style.display = "block";
    objetoConteudoModal.innerHTML = '';
    listarAgendamentos(diaClickBox);
}

function criarComponenteListaModal(titulo, hora, index) {
     let objetoListaModal = document.createElement('li');
     let objetoListaItem = document.createElement('div');
     let objetoTitulo = document.createElement('p');
     let objetoHora = document.createElement('p');
     let objetoBotaoRemover = document.createElement('button');
     objetoBotaoRemover.innerText = 'Remover'
     objetoBotaoRemover.addEventListener("click", (event) => {
        agendamentos.splice(index, 1);
        objetoConteudoModal.innerHTML = '';
        listarAgendamentos(diaClick);
        window.localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
     });
     objetoListaItem.classList.add('listaItem');
     objetoTitulo.innerText = titulo;
     objetoHora = hora;
     objetoListaItem.append(objetoTitulo);
     objetoListaItem.append(objetoHora);
     objetoListaItem.append(objetoBotaoRemover);
     objetoListaModal.append(objetoListaItem);
     return objetoListaModal;
}

function criarComponenteBoxDiaMes(valor, mostrarTexto, primeiraSemana) {
    var divBoxDiaMes = document.createElement('div');
    var campoTextoDia = document.createElement('p');
    const diaAtualTexto = (valor - primeiraSemana) + 1;
    divBoxDiaMes.classList.add('boxDiaMes');
    campoTextoDia.innerText = mostrarTexto ? diaAtualTexto : " ";
    divBoxDiaMes.append(campoTextoDia);
    if(mostrarTexto) {
        divBoxDiaMes.addEventListener("click", (event) => {
            diaClick = diaAtualTexto;
            clickBoxDia(event, diaAtualTexto);
        });
    }
    return divBoxDiaMes;
}

function listarAgendamentos(diaClickBox) {
    let totalAgendamentosDia = 0;
    if(agendamentos.length > 0) {
        let objetoLista = document.createElement('ul');
        objetoLista.classList.add('listaModal');
        agendamentos.forEach((valor, index) => {
            if(valor.data == ano + '-' + mes + '-' + diaClickBox) {
                objetoLista.append(criarComponenteListaModal(valor.paciente, valor.hora, index));
                totalAgendamentosDia++;
            }
        });
        if(totalAgendamentosDia == 0) {
            criarComponenteSemAgendamento();
        } else {
            objetoConteudoModal.append(objetoLista);
        }
    } else {
        criarComponenteSemAgendamento();
    }
}

function criarComponenteSemAgendamento() {
    let textoConteudo = document.createElement('p');
    textoConteudo.classList.add('alinhaTextoCentro');
    textoConteudo.innerText = "Nenhum agendamento marcado para esse dia."
    objetoConteudoModal.append(textoConteudo);
}

function preenchimentoCalendario() {
    carregarPacientes()
    carregarAgendamento();
    popularComboBoxPaciente();
    let calculoSemanaPrimeiroDiaMes = diaAtualMes(mes, ano, 1);
    let calculoSemanaUltimoDiaMes = diaAtualMes(mes, ano, diasDoMes(mes, ano));

    for (let indexDiasMes = 0; indexDiasMes < diasDoMes(mes, ano) + calculoSemanaPrimeiroDiaMes; indexDiasMes++) {
        if(indexDiasMes == 0 || (indexDiasMes) % 7 == 0) {
            var objetoSemanaMes = document.createElement('div');
            objetoSemanaMes.classList.add('semanasMes');
        }

        
        objetoSemanaMes.append(criarComponenteBoxDiaMes(indexDiasMes, calculoSemanaPrimeiroDiaMes <= indexDiasMes, calculoSemanaPrimeiroDiaMes));
        if(indexDiasMes == (diasDoMes(mes, ano) + calculoSemanaPrimeiroDiaMes) - 1) {
            for (let index = 0; index <= 5 - calculoSemanaUltimoDiaMes; index++) {
                objetoSemanaMes.append(criarComponenteBoxDiaMes(indexDiasMes, false, calculoSemanaPrimeiroDiaMes));
            }
        }
        objetoDivDiasMes.append(objetoSemanaMes);
        
        
    }

}

function cadastraAgendamento() {
    let inputPaciente = document.querySelector('#pacienteInputModal');
    let inputHora = document.querySelector('#horaInputModal');
    
    jsonAgendamento = {
        paciente: inputPaciente.value,
        data: ano + '-' + mes + '-' + diaClick,
        hora: inputHora.value
    };
    inputHora.value = '';
    inputPaciente.value = '';
    agendamentos.push(jsonAgendamento);
    window.localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    objetoConteudoModal.innerHTML = '';
    listarAgendamentos(diaClick);
}


function carregarAgendamento() {
    agendamentos = JSON.parse(localStorage.getItem("agendamentos"));
    if(agendamentos == null) {
        agendamentos = [];
    }
}

function carregarPacientes() {
    pacientes = JSON.parse(localStorage.getItem("pacientes"));
    if(pacientes == null) {
        pacientes = [];
    }
}

function popularComboBoxPaciente() {
    let comboBoxPaciente = document.querySelector("#pacienteInputModal");
    pacientes.forEach(element => {
        var pacienteItemCombo = document.createElement('option');
        pacienteItemCombo.value = element.nome;
        pacienteItemCombo.innerHTML = element.nome;
        comboBoxPaciente.append(pacienteItemCombo);
    });
}

function verificarUsuarioLogado() {
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if(usuarioLogado == null) {
        alert("Efetue o login primeiro");
        window.location = "tela_login.html";
    }
}

verificarUsuarioLogado();
preenchimentoCalendario();
