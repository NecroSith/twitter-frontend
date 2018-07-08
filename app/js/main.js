$(document).ready(function() {

	var likes = 0;
	var $tweetLikeIcon;
	var tweetBase = [
			{
				date: '20 мая 2018 года',
				text: 'Делал-делал свой проект, пока не осознал, что заказал не те батареи. Поэтому придется пожить пока без беспроводной погодной станции, зато теперь есть 3 пары 9 вольтовых батареек типа Крона :)'
			},
			{
				date: '24 мая 2018 года',
				text: 'Алгоритм распознавания элементарных частиц поставлен на обучение!'
			},
			{
				date: '25 мая 2018 года',
				text: 'Отлично! Почти завершил выпускной проект по курсу HTML в http://webcademy.ru. Свой сайт-портфолио - это звучит круто!'
			},
			{
				date: '1 июня 2018 года',
				text: 'Обучение алгоритма распознаванию элементарных частиц на снимке идет куда медленнее, чем я рассчитывал - похоже дело в слабой видеокарте и том фрейворке, что я для этого использую. В Keras слишком муторно настраивать расчеты по GPU, нужно было использовать MXNet'
			},
			{
				date: '6 июня 2018 года',
				text: 'Наткнулся на ибее на интересную штуку, черно белую делюксовую фотобумагу. Стоит очень дорого для фотобумаги, особенно с доставкой, но в нашей стране ее нет, а я планирую использовать ее для солярографии'
			},
			{
				date: '14 июня 2018 года',
				text: 'Появилась идея создать с помощью Arduino Nano механизм для автоматического открытия и закрытия шкатулки по хлопку в ладоши. Это будет крайне весело, скоро сяду за проектирование'
			},
			{
				date: '22 июня 2018 года',
				text: 'Сегодня Луна была особенно хорошо видна, так что удалось сделать несколько неплохих фоток, но после обработки в лайтруме значительного улучшения качества я не добился даже из raw. Еще одно подтверждение тому, что нужен нормальный телескоп'
			},
			{
				date: '05 июля 2018 года',
				text: 'Сверстал макет сайта-блога путешественников. Использовал React на полную катушку. Замечательная вещь'
			},
			{
				date: '07 июля 2018 года',
				text: 'Создал прототип химического газоанализатора на Arduino Uno'
			}
		];

	var countTweets = function() {
		var tweetCounter = $('.tweet-card').length;
		$('#tweetCount').text(tweetCounter);
	}

	var countLikes = function() {
		$('#likeCount').text(likes);
	}


	var wrapURLs = function (text, new_window) {
		var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
		var target = (new_window === true || new_window == null) ? '_blank' : '';
		  
		return text.replace(url_pattern, function (url) {
			var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
			var href = protocol_pattern.test(url) ? url : 'http://' + url;
			return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
		});
	};


	var createTweet = function(date, text) {

		var $tweetBox = $('<div class="card tweet-card">');
		var $tweetDate = $('<div class="tweet-date">').text(date);
		var $tweetLikeWrapper = $('<div id="likeBtn" class="like">');
		$tweetLikeText = $('<p></p>').text('Мне нравится');
		var $tweetLikeIcon = ('<i class="far fa-heart">');
		var $tweetText = $('<div class="tweet-text">').html(wrapURLs(text)).wrapInner('<p></p>');

		var additionalClassName;

		if (text.length < 100) {
			additionalClassName = "font-size-large";
		}
		else if (text.length > 150) {
			additionalClassName = "font-size-small";
		}
		else {
			additionalClassName = "font-size-medium";
		}

		$tweetText.addClass(additionalClassName);

		$tweetLikeWrapper.append($tweetLikeText)
			.append($tweetLikeIcon);

		$tweetBox.append($tweetDate)
			.append($tweetText)
			.append($tweetLikeWrapper);
			

		$('#tweetList').prepend($tweetBox);
		countTweets();
	}


	tweetBase.forEach( function(tweet) {
		createTweet(tweet.date, tweet.text);
	});
		

	var getCurrentDate = function() {

		var currentDate = new Date(),
			year = currentDate.getFullYear(),
			month = currentDate.getMonth(),
			day = currentDate.getDate(),
			hours = currentDate.getHours(),
			minutes = currentDate.getMinutes();

		var monthArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");

		if (day < 10) {
			day = '0' + day;
		}

		if (hours < 10) {
			hours = '0' + hours;
		}

		if (minutes < 10) {
			minutes = '0' + minutes;
		}

		var actualDate = `${day} ${monthArray[month]} ${year} года в ${hours}:${minutes}`;
		
		return actualDate;
	}


	$('#postNewTweet').on('submit', function(e) {
		e.preventDefault();
		
		var tweetText = $('#tweetText').val();

		createTweet(getCurrentDate(), tweetText);

		$('#tweetText').val('');
	})

	$('#likeBtn').on('click', function(e) {
		// e.preventDefault();
		$(this).addClass("active");

		$('.fa-heart').removeClass('far').addClass('fas');

		likes++;

		countLikes();
	})

});