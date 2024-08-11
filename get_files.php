<?php
header('Content-Type: application/json');

$moviesDir = 'watch/movies/';
$seriesDir = 'watch/series/';

$movies = array_diff(scandir($moviesDir), array('..', '.'));
$series = array_diff(scandir($seriesDir), array('..', '.'));

$response = array(
    'movies' => array_values($movies),
    'series' => array_values($series)
);

echo json_encode($response);
?>