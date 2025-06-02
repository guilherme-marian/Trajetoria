const xPieChart = ["Italy", "France", "Spain", "USA", "Argentina"];
const yPieChart = [55, 49, 44, 24, 15];
const pieColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

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