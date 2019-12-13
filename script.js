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
      printPieChart(data['fatturato_by_agent']);
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function printLineChart (data) {
  var ctx = $('#line-chart');
  var myChart = new Chart(ctx, {
    type: data['type'],
    data: {
      labels: moment.months(),
      datasets: [{
        label: 'Vendite',
        data: data['data'],
        backgroundColor: 'rgba(0, 128, 0, 1)',
        borderColor: 'rgba(255, 0, 0, 1)',
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

function printPieChart (data) {
  var labels = Object.keys(data['data']);
  var values = Object.values(data['data']);
  var ctx = $('#pie-chart');
  var myChart = new Chart(ctx, {
    type: data['type'],
    data: {
      labels: labels,
      datasets: [{
        label: 'Vendite',
        data: values,
        backgroundColor: 'rgba(255, 255, 0, 1)',
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 3
      }]
    }
  });
}