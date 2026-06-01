// ------------------------------
// FUNÇÃO PARA VOLTAR PARA A PÁGINA DE CADASTRO
// ------------------------------
function voltarPagina() {
    // Apaga os dados do cadastro para permitir novo acesso
    localStorage.removeItem('dadosCadastro');
    // Redireciona para a página de cadastro
    window.location.href = 'index.html';
}

// ------------------------------
// FUNÇÃO PARA VERIFICAR SE O USUÁRIO JÁ SE CADASTROU
// ------------------------------
function verificarCadastro() {
    // Pega os dados salvos no computador do usuário
    const dadosCadastro = localStorage.getItem('dadosCadastro');
    
    // Se não tiver cadastro, mostra a página de cadastro
    if (!dadosCadastro) {
        const form = document.getElementById('formCadastro');
        const mensagem = document.getElementById('mensagemSucesso');
        
        if (form) form.style.display = 'block';
        if (mensagem) mensagem.style.display = 'none';
    } 
    // Se já tiver cadastro, entra direto na página de matérias
    else {
        window.location.href = 'materias.html';
    }
}

// ------------------------------
// FUNÇÃO PARA REALIZAR O CADASTRO
// ------------------------------
function realizarCadastro(event) {
    // Impede que o formulário envie os dados automaticamente
    event.preventDefault();

    // Pega os dados que o usuário digitou
    const dados = {
        tipoUsuario: document.getElementById('tipoUsuario').value,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        dataCadastro: new Date().toLocaleString('pt-BR')
    };

    // Salva os dados no computador do usuário
    localStorage.setItem('dadosCadastro', JSON.stringify(dados));

    // Mostra a mensagem de sucesso e esconde o formulário
    document.getElementById('formCadastro').style.display = 'none';
    document.getElementById('mensagemSucesso').style.display = 'block';

    // Depois de 2 segundos, entra automaticamente na página de matérias
    setTimeout(function() {
        window.location.href = 'materias.html';
    }, 2000);
}

// ------------------------------
// FUNÇÃO PARA VERIFICAR SE A RESPOSTA DA QUESTÃO ESTÁ CORRETA
// ------------------------------
function verificarResposta(nomeQuestao, respostaCorreta) {
    // Pega todas as opções da questão
    const opcoes = document.getElementsByName(nomeQuestao);
    let respostaEscolhida = "";

    // Verifica qual opção o usuário marcou
    for (let i = 0; i < opcoes.length; i++) {
        if (opcoes[i].checked) {
            respostaEscolhida = opcoes[i].value;
            break;
        }
    }

    // Pega o local onde vai aparecer a mensagem de resultado
    const mensagem = document.getElementById("resposta-" + nomeQuestao);

    // Mostra a mensagem de acordo com o que foi escolhido
    if (respostaEscolhida === "") {
        // Se não marcou nenhuma opção
        mensagem.textContent = "⚠️ Escolha uma opção antes de verificar!";
        mensagem.style.color = "#e74c3c"; // Cor vermelha
    } 
    else if (respostaEscolhida === respostaCorreta) {
        // Se acertou a resposta
        mensagem.textContent = "✅ Resposta correta!";
        mensagem.style.color = "#27ae60"; // Cor verde
    } 
    else {
        // Se errou a resposta
        mensagem.textContent = "❌ Resposta errada. A resposta correta é a letra " + respostaCorreta.toUpperCase();
        mensagem.style.color = "#e74c3c"; // Cor vermelha
    }
}

// ------------------------------
// O QUE ACONTECE QUANDO A PÁGINA É ABERTA
// ------------------------------
window.onload = function() {
    // Verifica se o usuário já tem cadastro
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
