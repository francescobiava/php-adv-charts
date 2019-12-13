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
  Chart.defaults.scale.ticks.beginAtZero = true;
  printChart('fatturato-chart', data['type'], moment.months(), 'vendite', data['data']);
}

function printPieChart (data) {
  var labels = Object.keys(data['data']);
  var values = Object.values(data['data']);
  printChart ('fatturato-agent-chart', data['type'], labels, '', values);
}

function printChart(target, type, labels, label, data) {
  var ctx = $('#' + target);
  new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data
      }]
    }
  });
}