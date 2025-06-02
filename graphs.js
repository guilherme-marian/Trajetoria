const xPieChart = ["Italy", "France", "Spain", "USA", "Argentina"];
const yPieChart = [55, 49, 44, 24, 15];
const pieColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

Chart.defaults.color = "#fff"

new Chart("pieChart", {
  type: "pie",
  data: {
    labels: xPieChart,
    datasets: [{
      backgroundColor: pieColors,
      data: yPieChart
    }]
  },
   options: {
    customCanvasBackgroundColor:
    {
      color: '#131313',
    },
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    title: {
      display: true,
      text: "World Wide Wine Production 2018"
    }
  }
});

const xBarChart = ["Italy", "France", "Spain", "USA", "Argentina"];
const yBarChart = [55, 49, 44, 24, 15];
const barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"];

new Chart("barChart", {
  type: "bar",
  data: {
    labels: xBarChart,
    datasets: [{
      backgroundColor: barColors,
      data: yBarChart
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    legend: {display: false},
    scales: {
      yAxes: [{
        ticks: {
          grace: '999%',
          beginAtZero: true
        }
      }]
    },

    title: {
      display: true,
      text: "World Wine Production 2018"
    }
  }
});

const xRadarChart = ["samuel", "guilherme", "danilo", "luís"];
const yRadarChart = [90, 10, 50, 99];
const radarColor =
[
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

new Chart("radarChart", {
  type: "radar",
  data: {
    labels: xRadarChart,
    datasets: [{
      backgroundColor: radarColor,
      data: yRadarChart,
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    legend: {display: false},

    title: {
      display: true,
      text: "World Wine Production 2018"
    }
  }
});