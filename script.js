$(document).ready(init);

function init() {
  getCharts();
}

function getCharts() {
  $.ajax({
    url: 'getAllCharts.php',
    method: 'GET',
    success: function (data) {
      printLineChart(data['fatturato']);
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function printLineChart (data) {
  var ctx = document.getElementById('line-chart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: moment.months(),
      datasets: [{
        label: 'Vendite',
        data: data['data'],
        backgroundColor: ['rgba(0, 128, 0, 1)'],
        borderColor: ['rgba(255, 0, 0, 1)'],
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}