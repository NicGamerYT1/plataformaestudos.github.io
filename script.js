// Função para verificar se já tem cadastro
function verificarCadastro() {
    // Verifica se já tem dados salvos no computador
    const dadosCadastro = localStorage.getItem('dadosCadastro');
    
    // Se não tiver cadastro, mostra a página de cadastro
    if (!dadosCadastro) {
        // Mostra o formulário e esconde qualquer outra coisa
        document.getElementById('formCadastro').style.display = 'block';
        document.getElementById('mensagemSucesso').style.display = 'none';
    } 
    // Se já tiver cadastro, redireciona para a página principal
    else {
        window.location.href = 'materias.html';
    }
}

// Função para fazer o cadastro
function realizarCadastro(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Pega os dados que a pessoa digitou
    const dados = {
        tipoUsuario: document.getElementById('tipoUsuario').value,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        dataCadastro: new Date().toLocaleString('pt-BR')
    };

    // Salva os dados no computador da pessoa
    localStorage.setItem('dadosCadastro', JSON.stringify(dados));

    // Mostra a mensagem de sucesso e esconde o formulário
    document.getElementById('formCadastro').style.display = 'none';
    document.getElementById('mensagemSucesso').style.display = 'block';

    // Depois de 2 segundos, redireciona para o site de verdade
    setTimeout(function() {
        window.location.href = 'materias.html';
    }, 2000);
}

// Função para verificar resposta das questões (a mesma que já funcionava)
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

// Quando abrir a página, verifica se já tem cadastro
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
