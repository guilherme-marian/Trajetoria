const btnAdicionar = document.getElementById('btnAdicionarGrafico');
    const dashboard = document.getElementById('dashboard');
    let contador = 0;

    function criarGrafico(containerId, meses, valores, tipo) {
      const ctx = document.getElementById(containerId).getContext('2d');
      return new Chart(ctx, {
        type: tipo,
        data: {
          labels: meses,
          datasets: [{
            label: 'Produção',
            data: valores,
            backgroundColor: tipo === 'line' ? '#4e6e4e' : [
              '#4e6e4e','#5f875f','#6fa76f','#7fb87f','#8fc98f','#9fda9f'
            ],
            borderColor: '#5f875f',
            borderWidth: 1,
            fill: tipo === 'line' ? false : true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: tipo === 'bar' || tipo === 'line' ? {
            y: { beginAtZero: true, ticks: { color: '#e0e6de' }, grid: { color: '#3b463b' } },
            x: { ticks: { color: '#e0e6de' }, grid: { color: '#3b463b' } }
          } : {},
          plugins: {
            legend: { labels: { color: '#e0e6de' } },
            tooltip: { backgroundColor: '#4e6e4e', titleColor: '#ffffff', bodyColor: '#ffffff' }
          }
        }
      });
    }

    btnAdicionar.addEventListener('click', () => {
      const meses = document.getElementById('inputMeses').value.split(',').map(m => m.trim());
      const valores = document.getElementById('inputValores').value.split(',').map(v => Number(v.trim()));
      const tipo = document.getElementById('inputTipo').value;

      if (meses.length === 0 || valores.length === 0 || meses.length !== valores.length) {
        alert('Verifique se os meses e valores estão corretos e com a mesma quantidade.');
        return;
      }

      contador++;
      const graficoId = 'grafico' + contador;

      const card = document.createElement('div');
      card.className = 'grafico-card';
      card.innerHTML = `
        <canvas id="${graficoId}"></canvas>
        <div class="editar-dados">
          <label>Meses:</label>
          <input type="text" class="editarMeses" value="${meses.join(',')}">
          <label>Valores:</label>
          <input type="text" class="editarValores" value="${valores.join(',')}">
          <label>Tipo:</label>
          <select class="editarTipo">
            <option value="bar" ${tipo==='bar'?'selected':''}>Barra</option>
            <option value="line" ${tipo==='line'?'selected':''}>Linha</option>
            <option value="pie" ${tipo==='pie'?'selected':''}>Pizza</option>
            <option value="doughnut" ${tipo==='doughnut'?'selected':''}>Rosca</option>
          </select>
          <button class="btnAtualizar">Atualizar</button>
          <button class="btnRemover">Remover</button>
        </div>
      `;
      dashboard.appendChild(card);

      let chartObj = criarGrafico(graficoId, meses, valores, tipo);

      const btnAtualizar = card.querySelector('.btnAtualizar');
      btnAtualizar.addEventListener('click', () => {
        const novosMeses = card.querySelector('.editarMeses').value.split(',').map(m => m.trim());
        const novosValores = card.querySelector('.editarValores').value.split(',').map(v => Number(v.trim()));
        const novoTipo = card.querySelector('.editarTipo').value;
        if (novosMeses.length !== novosValores.length) {
          alert('Meses e valores precisam ter a mesma quantidade.');
          return;
        }
        chartObj.destroy();
        chartObj = criarGrafico(graficoId, novosMeses, novosValores, novoTipo);
      });

      const btnRemover = card.querySelector('.btnRemover');
      btnRemover.addEventListener('click', () => {
        chartObj.destroy();
        card.remove();
      });

      document.getElementById('inputMeses').value = '';
      document.getElementById('inputValores').value = '';
    });