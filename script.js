let date = new Date();
let ano = date.getFullYear();
let mes = date.getMonth() + 1;
var objetoDivDiasMes = document.querySelector('.diasMes');


function diasDoMes(mes, ano) {
    return new Date(ano, mes, 0).getDate();
}

// 0 - 6
function semanaAtual() {
   return date.getDay();
}

function diaAtualDoMes() {
    return date.getDate();
}

function clickBoxDia(event, diaClick) {
    alert(diaClick);
}

function criarComponenteBoxDiaMes(valor, mostrarTexto) {
    var divBoxDiaMes = document.createElement('div');
    var campoTextoDia = document.createElement('p');
    divBoxDiaMes.classList.add('boxDiaMes');
    campoTextoDia.innerText = !mostrarTexto ? "" : (valor);
    divBoxDiaMes.append(campoTextoDia);
    if(mostrarTexto) {
        divBoxDiaMes.addEventListener("click", function(event) {
            clickBoxDia(event, (valor) - semanaAtual());
        });
    }
    return divBoxDiaMes;
}

function preenchimentoCalendario() {
    
    for (let indexDiasMes = 0; indexDiasMes < diasDoMes(mes, ano) + semanaAtual(); indexDiasMes++) {
        if(indexDiasMes == 0 || (indexDiasMes) % 7 == 0) {
            var objetoSemanaMes = document.createElement('div');
            objetoSemanaMes.classList.add('semanasMes');
        }
        objetoSemanaMes.append(criarComponenteBoxDiaMes(indexDiasMes, indexDiasMes > semanaAtual()));
        
        objetoDivDiasMes.append(objetoSemanaMes);
    
    }

}

preenchimentoCalendario();