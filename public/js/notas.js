    // Seleciona elementos
    const btnAdicionar = document.querySelector('.btn-adicionar');
    const formNovaNota = document.querySelector('.nova-nota-form');
    const criarNotaBtn = document.getElementById('criarNotaBtn');
    const notasContainer = document.querySelector('.notas-container');

    // Mostra/oculta o formulário de nova nota
    btnAdicionar.addEventListener('click', () => {
      formNovaNota.style.display = formNovaNota.style.display === 'flex' ? 'none' : 'flex';
    });

    // Cria nova nota
    criarNotaBtn.addEventListener('click', () => {
      const titulo = document.getElementById('tituloNota').value.trim();
      const conteudo = document.getElementById('conteudoNota').value.trim();
      const cor = document.getElementById('corNota').value;

      if(titulo && conteudo) {
        const nota = document.createElement('div');
        nota.classList.add('nota');
        nota.style.backgroundColor = cor;
        nota.innerHTML = `<h3>${titulo}</h3><p>${conteudo}</p>`;
        notasContainer.appendChild(nota);

        // Limpa campos do formulário
        document.getElementById('tituloNota').value = '';
        document.getElementById('conteudoNota').value = '';
        document.getElementById('corNota').value = '#2f382f';
        formNovaNota.style.display = 'none';
      } else {
        alert('Preencha título e conteúdo da nota!');
      }
    });