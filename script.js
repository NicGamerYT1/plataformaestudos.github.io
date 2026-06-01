// ------------------------------
// VOLTAR PARA CADASTRO
// ------------------------------
function voltarPagina() {
    localStorage.removeItem('dadosCadastro');
    window.location.href = 'index.html';
}

// ------------------------------
// VERIFICAR SE USUÁRIO JÁ ESTÁ LOGADO
// ------------------------------
function verificarCadastro() {
    // Pegar os dados salvos e tentar converter para objeto
    const dadosSalvos = localStorage.getItem('dadosCadastro');
    
    // SE NÃO TEM DADOS: mostra formulário de cadastro
    if (!dadosSalvos) {
        if(document.getElementById('formCadastro')) {
            document.getElementById('formCadastro').style.display = 'block';
            document.getElementById('mensagemSucesso').style.display = 'none';
        }
    } 
    // SE TEM DADOS: já deixa na página de matérias, NÃO faz loop
}

// ------------------------------
// FAZER CADASTRO
// ------------------------------
function realizarCadastro(event) {
    event.preventDefault();

    const dados = {
        tipoUsuario: document.getElementById('tipoUsuario').value,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        dataCadastro: new Date().toLocaleString('pt-BR')
    };

    // Salvar os dados
    localStorage.setItem('dadosCadastro', JSON.stringify(dados));

    // Mostrar mensagem de sucesso
    document.getElementById('formCadastro').style.display = 'none';
    document.getElementById('mensagemSucesso').style.display = 'block';

    // Depois de 2 segundos, vai para matérias
    setTimeout(function() {
        window.location.href = 'materias.html';
    }, 2000);
}

// ------------------------------
// VERIFICAR RESPOSTAS DAS QUESTÕES
// ------------------------------
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
        mensagem.textContent = "⚠️ Escolha uma opção!";
        mensagem.style.color = "#e74c3c";
    } 
    else if (respostaEscolhida === respostaCorreta) {
        mensagem.textContent = "✅ Resposta correta!";
        mensagem.style.color = "#27ae60";
    } 
    else {
        mensagem.textContent = "❌ Errado! A resposta correta é a letra " + respostaCorreta.toUpperCase();
        mensagem.style.color = "#e74c3c";
    }
}

// ------------------------------
// AO ABRIR QUALQUER PÁGINA
// ------------------------------
window.onload = function() {
    // Roda a verificação de cadastro apenas na página de cadastro
    if(document.getElementById('formCadastro')) {
        verificarCadastro();
    }

    // Limpa mensagens de resposta ao abrir as páginas de questões
    if(document.querySelector('.resposta-correta')) {
        const todasMensagens = document.querySelectorAll('.resposta-correta');
        todasMensagens.forEach(m => {
            m.textContent = "";
            m.style.color = "";
        });
    }
};
