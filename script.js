// Função para verificar respostas das questões de múltipla escolha
function verificarResposta(nomeQuestao, respostaCorreta) {
    // Pega todas as opções da questão
    const opcoes = document.getElementsByName(nomeQuestao);
    let respostaEscolhida = "";

    // Verifica qual opção foi selecionada
    for (let i = 0; i < opcoes.length; i++) {
        if (opcoes[i].checked) {
            respostaEscolhida = opcoes[i].value;
            break;
        }
    }

    // Mostra o resultado para o aluno
    const mensagem = document.getElementById("resposta-" + nomeQuestao);
    
    if (respostaEscolhida === "") {
        mensagem.textContent = "⚠️ Escolha uma opção antes de verificar!";
        mensagem.className = "resposta-correta errada";
    } else if (respostaEscolhida === respostaCorreta) {
        mensagem.textContent = "✅ Resposta correta!";
        mensagem.className = "resposta-correta correta";
    } else {
        mensagem.textContent = "❌ Resposta errada. Tente novamente!";
        mensagem.className = "resposta-correta errada";
    }
}

// Função para mostrar resultado das respostas abertas
function mostrarResultado(idResposta, idMensagem) {
    const campoResposta = document.getElementById(idResposta);
    const mensagem = document.getElementById(idMensagem);

    if (campoResposta.value.trim() === "") {
        mensagem.textContent = "⚠️ Escreva sua resposta antes de enviar!";
        mensagem.className = "resultado errada";
    } else {
        mensagem.textContent = "📝 Resposta enviada com sucesso! Continue praticando.";
        mensagem.className = "resultado correta";
        // Limpa o campo depois de enviar
        campoResposta.value = "";
    }
}

// Função para limpar mensagens quando a página carregar
window.onload = function() {
    const todasMensagens = document.querySelectorAll('.resposta-correta, .resultado');
    todasMensagens.forEach(mensagem => {
        mensagem.textContent = "";
        mensagem.className = "";
    });
};
