<?php 

require "config.php";
require "db.php";
require "getTweets.php";


?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Свиттер - Ян Пустынный</title>

	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">

	<link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700|Noto+Serif:400,400i&amp;subset=cyrillic-ext" rel="stylesheet">
	
	<link rel="stylesheet" href="lib/bootstrap/dist/css/bootstrap.css">
	<link rel="stylesheet" href="css/main.css">
</head>
<body>
	<header class="main-header">
		<div class="container d-flex justify-content-between">
			<nav class="main__menu">
				<ul>
					<li class="menu__item">
						<a href="">
							<span class="menu__icon"><i class="fas fa-home"></i></span>
							<span class="menu__title">Главная</span>
						</a>
					</li>
					<li>
						<a href="">
							<span class="menu__icon"><i class="far fa-bell"></i></span>
							<span class="menu__title">Уведомления</span>
						</a>
					</li>
					<li>
						<a href="">
							<span class="menu__icon"><i class="far fa-envelope"></i></span>
							<span class="menu__title">Сообщения</span>
						</a>
					</li>
				</ul>		
			</nav>
			<span class="main__icon">		
				<i class="fas fa-tshirt"></i>
			</span>
			<div class="main__right-panel">
				<div class="main__search">
					<input type="text" placeholder="Поиск в Свиттере">
				</div>
				<div class="main__avatar">
					<img src="img/vfP1arq_2SM - копия.jpg" alt="Yan Pustynnyy">
				</div>
			</div>
		</div>
		</div>
	</header>
	<div class="container">
		<div class="row">
			<div class="col-md-4 mb-3">
				<div class="card">

					<div class="profile-background"></div>

					<div class="profile-avatar">
						<img src="img/vfP1arq_2SM - копия.jpg" alt="Yan Pustynnyy">
					</div>

					<div>

						<div class="card-body">
							<h1 class="profile-title">Ян Пустынный</h1>
							<div class="profile-description">
								<p>Фронтенд разработка, машинное обучение, астрономия, автоматика и роботохеника</p>
							</div>

							<ul class="stats">
								<li class="stats-item">
									<b class="stats-title">Свиты</b>
									<b id="tweetCount" class="stats-count"><?=$numRows?></b>
								</li>
								<li class="stats-item">
									<b class="stats-title">Лайки</b>
									<b id="likeCount" class="stats-count">0</b>
								</li>
							</ul>

						</div>
					</div>
				</div>
			</div>

			<div class="col-md-8">

				<div class="card mb-3">
					<div class="card-body">
						<form id="postNewTweet">
						  <div class="form-group">
						    <input type="text" name="tweetText" class="form-control" id="tweetText"  placeholder="Что нового?">
						  </div>
						  <button type="submit" class="btn btn-primary">Свитнуть</button>
						</form>
					</div>
				</div>

				<div id="resultSuccess" class="alert alert-success d-none" role="alert">
				  Свит успешно добавлен!
				</div>
				<div id="resultError" class="alert alert-danger d-none" role="alert">
				  Произошла ошибка при добавлении свита!
				</div>

				<div class="card card-title-only tweet-card--rounded-top">
					<div class="h4 mb-0">Свиты пользователя</div>
				</div>

				<div id="tweetList">


					<?php 

					foreach ($tweets as $tweet) { 
						?>
						<div class="card tweet-card">
							<div class="tweet-date"><?=$tweet['date']?>
							</div>
							<?php 

							$textClass = "font-size-normal";
							$stringNoTags = strip_tags($tweet['text']);

							if (mb_strlen($stringNoTags) < 100) {
								$textClass = "font-size-large";
							}
							else if (mb_strlen($stringNoTags) > 150) {
								$textClass = "font-size-small";
							}

							?>
							<div class="tweet-text <?=$textClass?>" >
								<p><?=$tweet['text']?></p>
							</div>
							<div id="<?=$tweet['id']?>" class="like">
								<p>Мне нравится</p>
								<i class="far fa-heart"></i>
							</div>
						</div>
					<?php } ?>

				</div>

				<footer class="footer">
					
					<p class="footer-copyright">
						&copy; Ян Пустынный 2018 <br/>
						Сверстано с <i class="fas fa-heart"></i> в
						<a class="footer-link" href="http://webcademy.ru" target="_blank">WebCademy.ru</a> в 2018 году
					</p>

				</footer>
			</div>
		</div>
	</div>
	<script src='lib/jquery/dist/jquery.min.js'></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
	<script src="lib/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="js/main.js"></script>
</body>
</html>