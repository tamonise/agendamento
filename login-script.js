let usuarios = [];
let inputs = document.getElementsByClassName('input-form');


for (let input of inputs) {
    input.addEventListener("blur", function() {
        if(input.value.trim() != ""){
            input.classList.add("has-val");
        } else {
            input.classList.remove("has-val");
        }
    });
}

function carregarUsuarios() {
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if(usuarios == null) {
        usuarios = [];
    }
}

function cadastrarUsuario() {
    
    let inputNome = document.querySelector('#nomeInput');
    let inputEmail = document.querySelector('#emailInput');
    let inputSenha = document.querySelector('#senhaInput');

    const usuario = {
        nome: inputNome.value,
        email: inputEmail.value,
        senha: inputSenha.value
    };
    usuarios.push(usuario);
    window.localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro efetuado com suceso!!");

    window.location = "tela_login.html";
}

function procurarUsuarioPorEmail(email) {
    let usuario = null;

    usuarios.forEach(valor => {
        if(valor.email == email) {
            usuario = valor;
        }
    });
    return usuario;
}

function efetuarLogin() {
    let inputEmail = document.querySelector("#inputEmail");
    let inputSenha = document.querySelector("#inputSenha");
    let usuario = procurarUsuarioPorEmail(inputEmail.value);
    if(inputEmail.value == "" || inputSenha.value == "") {
        alert("Favor preencher todos os campos");
    } else {
        if(usuario == null) {
            alert("Usuário não encontrado");
        } else {
            if(usuario.senha != inputSenha.value) {
                alert("Senha incorreta");
            } else {
                window.localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
                window.location = "index.html";
            }
        }
    }
}

carregarUsuarios();