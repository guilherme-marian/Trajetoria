function addLine() {
    const container = document.getElementById('line-container');
    const div = document.createElement('div');

    div.innerHTML = `
        <input type="text" placeholder="Texto" id="name" class="name">
        <input type="number" placeholder="Valor" id="number" class="number">
    `;
    container.appendChild(div);
}
function addGraph() {
    const container = document.getElementById('graphs-container');
    const div = document.createElement('div');
    div.innerHTML = `
                    <form action="/Criar" method="post">
                        <input type="radio" name="GraphType" id="GraphType" checked onClick="chartType('bar')">Bar Graph</input>
                        <input type="radio" name="GraphType" id="GraphType" onClick="chartType('line')">Line Graph</input>
                        <input type="radio" name="GraphType" id="GraphType" onClick="chartType('pie')">Pie Graph</input>
                        <input type="button" value="add Line" onclick="addLine()"></input>
                        <div id="line-container">
                            <input type="text" placeholder="Texto" class="name">
                            <input type="number" placeholder="Valor" class="number">
                        </div>
                        <input type="text" placeholder="Graph Title" id="title" name="title">
                        <input type="submit" onclick="submitForm()">
                    </form>`
    container.appendChild(div);
}

let selectedChartType = 'bar';

function chartType(type) {
    selectedChartType = type;
    console.log('Selected chart type:', selectedChartType);
}   

function submitForm(event) {
    event.preventDefault()

    const chart_type = selectedChartType; 
    const line = [];
    const title = document.getElementById('title').value;

    const container = document.getElementById('line-container');
    const divs = container.querySelectorAll('div');
    divs.forEach(div => {
        const name = div.querySelector('.name').value;
        const number = parseInt(div.querySelector('.number').value, 10);
        if (name && !isNaN(number)) {
            line.push({ name, number })
        }
    });

    const user_id = localStorage.getItem('userId');
    console.log('Sending user_id:', user_id);

    fetch('/Criar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({line, title, GraphType: chart_type, user_id})
    })
    .then(response => response.json())
    .then(data => {
        if (data.imagePath) {
            console.log(data);
            const img = document.createElement('img');
            img.src = data.imagePath;
            img.alt = 'Bar chart';
            img.style.maxWidth = '400px';
            const container = document.getElementById('chart-container');
            
            container.appendChild(img)
        }
    });
}

function loadUserGraphs(userId) {
    fetch(`/user-graphs/${userId}`)
        .then(res => res.json())
        .then(graphs => {
            const container = document.getElementById('chart-container');
            container.innerHTML = ''; 

            graphs.forEach(graph => {
                const img = document.createElement('img');
                btn.onclick = () => {
                    fetch(`/delete-graph/${graph.id}`, { method: 'DELETE' })
                        .then(response => {
                            if (response.ok) {
                                loadUserGraphs(userId);
                            }
                        });
                }
                img.src = `img/${graph.image_path}`;
                img.alt = graph.title;
                img.style.maxWidth = '400px';
                img.style.margin = '10px';
                container.appendChild(img, btn);
            });
        })
        .catch(err => console.error('Error loading graphs:', err));
}


window.onload = () => {
    addLine();
    const userId = localStorage.getItem('userId'); 
    if (userId) {
        loadUserGraphs(userId);
    }
};
