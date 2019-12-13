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
      printMultiLineChart(data['team_efficiency']);
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function printLineChart(data) {
  Chart.defaults.scale.ticks.beginAtZero = true;
  var datasets = [{
    label: 'Vendite',
    data: data['data'],
    backgroundColor: '#008000',
    borderColor: '#ff0000',
    pointBackgroundColor: '#ff0000'
  }];
  printChart('fatturato-chart', data['type'], moment.months(), datasets);
}

function printPieChart(data) {
  var labels = Object.keys(data['data']);
  var values = Object.values(data['data']);
  var datasets = [{
    label: '',
    data: values,
    backgroundColor: '#ffff00',
    borderColor: '#ff0000'
  }];
  printChart('fatturato-agent-chart', data['type'], labels, datasets);
}

function printMultiLineChart(data) {
  Chart.defaults.scale.ticks.beginAtZero = true;
  var label = Object.keys(data['data']);
  var values = Object.values(data['data']);
  var colors = ['#0000ff', '#008000', '#ff8000']
  var datasets = [];  
  for (var i = 0; i < label.length; i++) {
    var line = {
      label: label[i],
      data: values[i],
      borderColor: colors[i],
      pointBackgroundColor: colors[i]
    }
    datasets.push(line);
  }
  printChart('efficiency-chart', data['type'], moment.months(), datasets);
}

function printChart(target, type, labels, datasets) {
  var ctx = $('#' + target);
  new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: datasets
    }
  });
}