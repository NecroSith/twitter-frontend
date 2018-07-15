<?php 


$query = "SELECT * FROM tweets ORDER BY id DESC";
$result = mysqli_query($connect, $query);

if (!$result) {
	die(mysqli_error($connect));
}

$numRows = mysqli_num_rows($result);
$tweets = array();

for ($index = 0; $index < $numRows; $index++) {
	$row = mysqli_fetch_assoc($result);
	$tweets[] = $row;
}

// print_r($tweets);

?>