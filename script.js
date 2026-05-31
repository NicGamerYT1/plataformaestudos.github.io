// Função para verificar se a resposta está correta
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

    // Se não escolheu nenhuma opção
    const mensagem = document.getElementById("resposta-" + nomeQuestao);
    
    if (respostaEscolhida === "") {
        mensagem.textContent = "⚠️ Escolha uma opção antes de verificar!";
        mensagem.style.color = "#e74c3c";
    } 
    // Se acertou
    else if (respostaEscolhida === respostaCorreta) {
        mensagem.textContent = "✅ Resposta correta!";
        mensagem.style.color = "#27ae60";
    } 
    // Se errou
    else {
        mensagem.textContent = "❌ Resposta errada. A resposta correta é a letra " + respostaCorreta.toUpperCase();
        mensagem.style.color = "#e74c3c";
    }
}

// Limpa as mensagens quando abrir a página
window.onload = function() {
    const todasMensagens = document.querySelectorAll('.resposta-correta');
    todasMensagens.forEach(mensagem => {
        mensagem.textContent = "";
        mensagem.style.color = "";
    });
};
