<?php

header('Content-Type: application/json');
include 'data.php';

$level = $_GET['level'];
$output = [];

foreach ($graphs as $key => $graph) {
  if ($graph['access'] == 'guest') {
    $output [$key] = $graph;
  }
  if ($graph['access'] == 'clevel' && $level == 'clevel') {
    $output [$key] = $graph;
  }
  if ($graph['access'] == 'employee' && ($level == 'employee' || $level == 'clevel')) {
    $output [$key] = $graph;
  }
}

echo json_encode($output);

?>