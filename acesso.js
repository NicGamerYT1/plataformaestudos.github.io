// ================================================
//  acesso.js — Guarda de acesso da plataforma
//  Inclua este arquivo em todas as páginas
//  protegidas com:
//  <script src="acesso.js"></script>
//  e chame verificarAcesso() no window.onload
// ================================================

/**
 * Verifica se o usuário tem acesso à página.
 * - Sem login → redireciona para login.html
 * - Teste expirado e sem assinatura → redireciona para assinatura.html
 * - OK → retorna o objeto do usuário
 */
function verificarAcesso() {
  const salvo = localStorage.getItem('usuarioLogado');

  // Sem login
  if (!salvo) {
    window.location.href = 'login.html';
    return null;
  }

  const u = JSON.parse(salvo);
  const agora     = new Date();
  const fimTeste  = new Date(u.dataFimTeste);
  const testeAtivo      = agora < fimTeste;
  const assinaturaAtiva = u.statusAssinatura === 'ativa';

  // Acesso liberado
  if (testeAtivo || assinaturaAtiva) {
    return u;
  }

  // Expirado — grava status e redireciona
  u.statusAssinatura = 'expirada';
  localStorage.setItem('usuarioLogado', JSON.stringify(u));
  window.location.href = 'assinatura.html?motivo=expirado';
  return null;
}

/**
 * Preenche o nome do usuário em elementos com id="nomeUsuario"
 * e id="nomeBoasVindas" (se existir).
 */
function preencherNome() {
  const salvo = localStorage.getItem('usuarioLogado');
  if (!salvo) return;
  const u = JSON.parse(salvo);
  const elNome = document.getElementById('nomeUsuario');
  const elBoas = document.getElementById('nomeBoasVindas');
  if (elNome) elNome.textContent = u.nome;
  if (elBoas) elBoas.textContent = u.nome;
}

/**
 * Faz logout e redireciona para login.html
 */
function sairDaConta() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}

/**
 * Abre/fecha o menu lateral no mobile
 */
function toggleMenu() {
  const menu  = document.getElementById('menuLateral');
  const fundo = document.getElementById('fundoMenu');
  if (menu)  menu.classList.toggle('-translate-x-full');
  if (fundo) fundo.classList.toggle('hidden');
}
