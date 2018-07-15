<?php 

require "config.php";
require "db.php";

// print_r($_POST);

if (isset($_POST['tweetText'])) {
	$text = $_POST['tweetText'];
	// echo $text;

	if ($text == '') {
		$errors[] = ['title' => 'Введите текст свита'];
	}

	if (empty($errors)) {
		$text = mysqli_real_escape_string($connect, $text);

		$query = "INSERT INTO tweets (`date`, `text`) VALUES (NOW(), '" . $text . "')";
		$result = mysqli_query($connect, $query);
		if (!$result) {
			die(mysqli_error($connect));
		}
		echo "success";
	}
	else {
		echo "error";
	}
}


?>