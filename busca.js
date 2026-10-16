const INDICE_BUSCA = [
  { icone: "🥋", titulo: "Página inicial", url: "index.html", categoria: "Engel Team",
    texto: "Equipe de Taekwondo fundada em 1997 em Duque de Caxias. Projeto Aqui Fazemos Campeões." },

  { icone: "🎯", titulo: "Visão, Missão e Valores", url: "index.html", categoria: "Sobre",
    texto: "Visão: ser referência em transformação social. Missão: promover desenvolvimento através do Taekwondo. Valores: trabalho em equipe, honestidade, disciplina." },

  { icone: "🏢", titulo: "Centro de Treinamento Saracuruna", url: "index.html", categoria: "Estrutura",
    texto: "Centro de treinamento em Saracuruna, Duque de Caxias, RJ. Aulas de Taekwondo, reforço escolar e defesa pessoal." },

  { icone: "📚", titulo: "Reforço Escolar", url: "index.html", categoria: "Atividades",
    texto: "Reforço escolar dividido por séries para melhorar o desempenho dos atletas nas escolas." },

  { icone: "🏆", titulo: "Treino de Alto Rendimento", url: "index.html", categoria: "Atividades",
    texto: "Time Elite com planejamento anual focado em competições nacionais. Bolsa Atleta Federal e bolsas em faculdades." },

  { icone: "🧒", titulo: "Projeto Kids", url: "index.html", categoria: "Projetos",
    texto: "Projeto kids iniciado em 2017 para crianças a partir de 4 anos. Coordenação motora, concentração e disciplina." },

  { icone: "💪", titulo: "Defesa Pessoal Feminina", url: "index.html", categoria: "Projetos",
    texto: "Projeto Poderosas atende mães dos alunos com aulas de defesa pessoal feminina e empoderamento." },

  { icone: "🧠", titulo: "Atendimento Psicológico Esportivo", url: "index.html", categoria: "Projetos",
    texto: "Sala Mente Campeã: espaço de atendimento psicológico esportivo exclusivo para atletas." },

  { icone: "🏫", titulo: "Taekwondo nas Escolas", url: "index.html", categoria: "Projetos",
    texto: "Programa escola parceira. Títulos no Jebs, Jogos da Juventude e Mundial Escolar." },

  { icone: "💚", titulo: "Faça uma Doação", url: "index.html#doacao", categoria: "Apoie",
    texto: "Contribua com o projeto Aqui Fazemos Campeões. Doações a partir de R$ 30. Pix CNPJ 53.074.695/0001-12." },

  // ===== CONTATOS =====
  { icone: "📞", titulo: "Contatos", url: "contatos.html", categoria: "Fale conosco",
    texto: "WhatsApp (21) 98410-0162, email esporte.aeafc@gmail.com e Instagram @engelteamtkd." },

  { icone: "📍", titulo: "Endereço e Horário", url: "contatos.html", categoria: "Fale conosco",
    texto: "Av. Barão do Rio Branco, 348 - Parque Uruguaiana, Duque de Caxias, RJ. Funcionamento das 8h às 21h." },

  // ===== TRANSPARÊNCIA =====
  { icone: "📄", titulo: "CRF 2024", url: "doc/C R F - 2024.pdf", categoria: "Contabilidade", texto: "Certidão de Regularidade do FGTS 2024" },

  { icone: "📜", titulo: "Estatuto", url: "transparencia.html", categoria: "Documentos",
    texto: "Estatuto social da associação." },

  { icone: "🗳️", titulo: "Atas de Eleição", url: "transparencia.html", categoria: "Documentos",
    texto: "Atas de eleição da diretoria da associação." },

  { icone: "💰", titulo: "Contabilidade", url: "transparencia.html", categoria: "Documentos",
    texto: "Balanço patrimonial, DRE, ECF, relatório financeiro, certidões CNDT, composição de índice." },

  { icone: "⚖️", titulo: "Conselho Fiscal", url: "transparencia.html", categoria: "Documentos",
    texto: "Pareceres do conselho fiscal da associação." },

  { icone: "📢", titulo: "Chamamento da Eleição", url: "transparencia.html", categoria: "Documentos",
    texto: "Jornal impresso da convocação, declaração e publicações do chamamento da eleição." },

  { icone: "🏛️", titulo: "Organograma Diretoria", url: "transparencia.html", categoria: "Documentos",
    texto: "Organograma da diretoria da Engel Team." },

  // ===== FAQ =====
  { icone: "❓", titulo: "Como faço para treinar?", url: "faq.html", categoria: "FAQ",
    texto: "Entre em contato pelo WhatsApp (21) 98410-0162 para agendar a sua aula experimental." },

  { icone: "❓", titulo: "A partir de quantos anos pode treinar?", url: "faq.html", categoria: "FAQ",
    texto: "Podem treinar crianças a partir dos 4 anos de idade até os 18 anos." },

  { icone: "❓", titulo: "Qual o valor da mensalidade?", url: "faq.html", categoria: "FAQ",
    texto: "Nossas aulas são gratuitas, não tem mensalidade." },

  { icone: "❓", titulo: "Quais são os dias das aulas experimentais?", url: "faq.html", categoria: "FAQ",
    texto: "Nossos dias de aulas experimentais são: terças e quintas-feiras." },

  { icone: "❓", titulo: "Por onde acompanho os resultados da equipe?", url: "faq.html", categoria: "FAQ",
    texto: "Resultados no site da CBTKD (cbtkd.org.br) e no Instagram @engelteamtkd." }
];

(function () {
  const input = document.getElementById('campo-busca');
  const lista = document.getElementById('resultados-busca');
  if (!input || !lista) return;

  let selecionado = -1;
  let itensAtuais = [];

  // Remove acentos e minúsculo
  const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Pontua o match: título vale mais que texto
  function pontuar(item, termo) {
    const t = norm(termo);
    const tit = norm(item.titulo);
    const txt = norm(item.texto);
    const cat = norm(item.categoria);

    let score = 0;
    if (tit.startsWith(t)) score += 100;
    else if (tit.includes(t)) score += 50;
    if (cat.includes(t)) score += 20;
    if (txt.includes(t)) score += 10;

    return score;
  }

  // Busca
  function buscar(termo) {
    const t = norm(termo.trim());
    if (t.length < 1) return [];
    return INDICE_BUSCA
      .map(item => ({ item, score: pontuar(item, t) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(x => x.item);
  }

  // Destaca o termo
  function hl(texto, termo) {
    if (!termo) return texto;
    const esc = termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return texto.replace(new RegExp(`(${esc})`, 'gi'), '<mark>$1</mark>');
  }

  // Render
  function render(itens, termo) {
    itensAtuais = itens;
    selecionado = -1;

    if (!termo || termo.length < 1) {
      lista.innerHTML = `
        <div class="busca-vazio">
          <span class="busca-vazio-emoji">🔍</span>
          <p>Digite para buscar no site</p>
          <small>Ex: doação, treino, contato, estatuto</small>
        </div>`;
      return;
    }

    if (itens.length === 0) {
      lista.innerHTML = `
        <div class="busca-vazio">
          <span class="busca-vazio-emoji">😕</span>
          <p>Nada encontrado para "<strong>${termo}</strong>"</p>
          <small>Tente outra palavra</small>
        </div>`;
      return;
    }

    lista.innerHTML = itens.map((item, i) => `
      <a href="${item.url}" class="busca-item" data-idx="${i}">
        <span class="busca-item-icone">${item.icone}</span>
        <div class="busca-item-conteudo">
          <div class="busca-item-titulo">${hl(item.titulo, termo)}</div>
          <div class="busca-item-meta">
            <span class="busca-item-categoria">${item.categoria}</span>
            <span class="busca-item-sep">·</span>
            <span class="busca-item-url">${item.url}</span>
          </div>
        </div>
        <span class="busca-item-seta">↵</span>
      </a>
    `).join('');
  }

  // Navegação por teclado
  function mover(dir) {
    const itens = lista.querySelectorAll('.busca-item');
    if (!itens.length) return;
    selecionado = (selecionado + dir + itens.length) % itens.length;
    itens.forEach((el, i) => el.classList.toggle('ativo', i === selecionado));
    itens[selecionado].scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('input', (e) => {
    const termo = e.target.value.trim();
    render(buscar(termo), termo);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); mover(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); mover(-1); }
    else if (e.key === 'Enter') {
      const ativo = lista.querySelector('.busca-item.ativo');
      if (ativo) { ativo.click(); }
      else {
        const primeiro = lista.querySelector('.busca-item');
        if (primeiro) primeiro.click();
      }
    }
  });

  // Hover destaca
  lista.addEventListener('mouseover', (e) => {
    const item = e.target.closest('.busca-item');
    if (!item) return;
    selecionado = parseInt(item.dataset.idx);
    lista.querySelectorAll('.busca-item').forEach((el, i) => el.classList.toggle('ativo', i === selecionado));
  });
})();