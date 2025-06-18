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
      fill: true,
      borderColor: '#fff',
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
      display: false,
      text: "World Wide Wine Production 2018"
    }
  }
});

const xBarChart = ["Italy", "France", "Spain", "USA", "Argentina"];
const yBarChart = [55, 49, 44, 24, 15];
const barColors = [
  "#E61E49",
  "#00C9C6",
  "#356BBD",
  "#EDC8BE",
  "#32B870"
  ];

const borderColor = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

new Chart("barChart", {
  type: "bar",
  data: {
    labels: xBarChart,
    datasets: [{
      borderColor: borderColor,
      borderWidth: 1,
      backgroundColor: barColors,
      data: yBarChart
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
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
      display: false,
      text: "World Wine Production 2018"
    }
  }
});

const xRadarChart = ["samuel", "guilherme", "danilo", "luís"];
const yRadarChart = [70, 90, 56, 99];
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
      display: false,
      text: "World Wine Production 2018"
    }
  }
});

const xLinearValues = [100,200,300,400,500,600,700,800,900,1000];

new Chart("linearChart", {
  type: "line",
  data: {
    labels: xLinearValues,
    datasets: [{ 
      data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
      borderColor: "#E61E49",
      fill: false
    }, { 
      data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
      borderColor: "#00C9C6",
      fill: false
    }, { 
      data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
      borderColor: "#356BBD",
      fill: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    legend: {display: false}
  }
});