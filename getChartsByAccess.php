<?php

header('Content-Type: application/json');
include 'data.php';

$level = $_GET['level'];
$output = [];

if ($level == 'guest') {
  foreach ($graphs as $chart) {
    if ($chart['access'] == $level) {
      $output[] = $chart;
    }
  }
}

if ($level == 'employee') {
  foreach ($graphs as $chart) {
    if ($chart['access'] == $level || $chart['access'] == 'guest') {
      $output[] = $chart;
    }
  }
}

if ($level == 'clevel') {
  foreach ($graphs as $chart) {
    $output[] = $chart;
  }
}

echo json_encode($output);

?>