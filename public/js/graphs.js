function addPerson() {
    const container = document.getElementById('people-container');
    const idx = container.children.length + 1;
    const div = document.createElement('div');

    div.innerHTML = `
        <input type="text" placeholder="Nome" class="nome">
        <input type="number" placeholder="Age" class="age">
    `;
    container.appendChild(div);
}

let selectedChartType = 'bar';

function chartType(type) {
    selectedChartType = type;
    console.log('Selected chart type:', selectedChartType);
}

function submitForm() {
    const chart_type = selectedChartType; 
    const people = [];
    const title = document.getElementById('title').value;

    const container = document.getElementById('people-container');
    const divs = container.querySelectorAll('div');
    divs.forEach(div => {
        const nome = div.querySelector('.nome').value;
        const age = parseInt(div.querySelector('.age').value, 10);
        if (nome && !isNaN(age)) {
            people.push({ nome, age })
        }
    });

    fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({people, title, chart_type})
    })
    .then(response => response.json())
    .then(data => {
        if (data.imagePath) {
            const img = document.createElement('img');
            img.src = data.imagePath;
            img.alt = 'Bar chart';
            img.style.maxWidth = '400px';
            const container = document.getElementById('chart-container');
            container.innerHTML = '';
            container.appendChild(img)
        }
    });
}

window.onload = addPerson;