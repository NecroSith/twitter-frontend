<?php 


function db_connect($host, $db_user, $db_pass, $db_name) {
	$connect = mysqli_connect($host,  $db_user, $db_pass, $db_name);

	if (!mysqli_set_charset($connect, "utf8")) {
		printf("Error: " . mysqli_error($connect));
	}

	return $connect;

}

$connect = db_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);


?>