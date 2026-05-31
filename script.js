// ------------------------------
// FUNÇÃO DE VOLTAR PÁGINA
// ------------------------------
function voltarPagina() {
    // Apaga os dados do cadastro para permitir novo acesso
    localStorage.removeItem('dadosCadastro');
    // Volta para a página de cadastro
    window.location.href = 'index.html';
}

// ------------------------------
// FUNÇÃO DE VERIFICAR CADASTRO
// ------------------------------
function verificarCadastro() {
    // Pega os dados salvos no computador
    const dadosCadastro = localStorage.getItem('dadosCadastro');
    
    // Se não tem cadastro, mostra a página de cadastro
    if (!dadosCadastro) {
        const form = document.getElementById('formCadastro');
        const mensagem = document.getElementById('mensagemSucesso');
        
        if(form) form.style.display = 'block';
        if(mensagem) mensagem.style.display = 'none';
    } 
    // Se já tem cadastro, entra direto nas matérias
    else {
        window.location.href = 'materias.html';
    }
}

// ------------------------------
// FUNÇÃO DE REALIZAR CADASTRO
// ------------------------------
function realizarCadastro(event) {
    event.preventDefault(); // Impede o formulário de enviar sozinho

    // Pega os dados que a pessoa digitou
    const dados = {
        tipoUsuario: document.getElementById('tipoUsuario').value,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        dataCadastro: new Date().toLocaleString('pt-BR')
    };

    // Salva os dados no computador
    localStorage.setItem('dadosCadastro', JSON.stringify(dados));

    // Mostra a mensagem de sucesso e esconde o formulário
    document.getElementById('formCadastro').style.display = 'none';
    document.getElementById('mensagemSucesso').style.display = 'block';

    // Depois de 2 segundos, entra no site
    setTimeout(function() {
        window.location.href = 'materias.html';
    }, 2000);
}

// ------------------------------
// FUNÇÃO DE VERIFICAR RESPOSTAS DAS QUESTÕES
// ------------------------------
function verificarResposta(nomeQuestao, respostaCorreta) {
    // Pega todas as opções da questão
    const opcoes = document.getElementsByName(nomeQuestao);
    let respostaEscolhida = "";

    // Verifica qual opção foi marcada
    for (let i = 0; i < opcoes.length; i++) {
        if (opcoes[i].checked) {
            respostaEscolhida = opcoes[i].value;
            break;
        }
    }

    // Pega o lugar onde vai aparecer a mensagem
    const mensagem = document.getElementById("resposta-" + nomeQuestao);

    // Verifica o que mostrar
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

// ------------------------------
// O QUE ACONTECE QUANDO ABRE A PÁGINA
// ------------------------------
window.onload = function() {
    // Verifica se já tem cadastro
    verificarCadastro();

    // Limpa as mensagens das questões quando abrir a página
    const todasMensagens = document.querySelectorAll('.resposta-correta');
    todasMensagens.forEach(mensagem => {
        if (mensagem) {
            mensagem.textContent = "";
            mensagem.style.color = "";
        }
    });
};
