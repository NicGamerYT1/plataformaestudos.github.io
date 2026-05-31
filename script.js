// Função para voltar para a página anterior
function voltarPagina() {
    // Apaga os dados do cadastro para permitir novo acesso
    localStorage.removeItem('dadosCadastro');
    // Volta para a página de cadastro
    window.location.href = 'index.html';
}

// Função para verificar se já tem cadastro
function verificarCadastro() {
    const dadosCadastro = localStorage.getItem('dadosCadastro');
    
    if (!dadosCadastro) {
        document.getElementById('formCadastro').style.display = 'block';
        document.getElementById('mensagemSucesso').style.display = 'none';
    } 
    else {
        window.location.href = 'materias.html';
    }
}

// Função para fazer o cadastro
function realizarCadastro(event) {
    event.preventDefault();

    const dados = {
        tipoUsuario: document.getElementById('tipoUsuario').value,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        dataCadastro: new Date().toLocaleString('pt-BR')
    };

    localStorage.setItem('dadosCadastro', JSON.stringify(dados));

    document.getElementById('formCadastro').style.display = 'none';
    document.getElementById('mensagemSucesso').style.display = 'block';

    setTimeout(function() {
        window.location.href = 'materias.html';
    }, 2000);
}

// Função para verificar respostas das questões
function verificarResposta(nomeQuestao, respostaCorreta) {
    const opcoes = document.getElementsByName(nomeQuestao);
    let respostaEscolhida = "";

    for (let i = 0; i < opcoes.length; i++) {
        if (opcoes[i].checked) {
            respostaEscolhida = opcoes[i].value;
            break;
        }
    }

    const mensagem = document.getElementById("resposta-" + nomeQuestao);
    
    if (respostaEscolhida === "") {
        mensagem.textContent = "⚠️ Escolha uma opção antes de verificar!";
        mensagem.style.color = "#e74c3c";
    } 
    else if (respostaEscolhida === respostaCorreta) {
        mensagem.textContent = "✅ Resposta correta!";
        mensagem.style.color = "#27ae60";
    } 
    else {
        mensagem.textContent = "❌ Resposta errada. A resposta correta é a letra " + respostaCorreta.toUpperCase();
        mensagem.style.color = "#e74c3c";
    }
}

// Quando abrir a página
window.onload = function() {
    verificarCadastro();
    
    // Limpa as mensagens das questões
    const todasMensagens = document.querySelectorAll('.resposta-correta');
    todasMensagens.forEach(mensagem => {
        if (mensagem) {
            mensagem.textContent = "";
            mensagem.style.color = "";
        }
    });
};
