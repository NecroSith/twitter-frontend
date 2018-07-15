$(document).ready(function() {

	var likes = 0;
	var $tweetLikeIcon;

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

		var $tweetBox = $('<div class="card tweet-card new">');
		var $tweetDate = $('<div class="tweet-date">').text(date);
		var $tweetLikeWrapper = $(`<div id="" class="like">`);
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
		setTimeout(function() {
			$tweetBox.removeClass('new');
		}, 2000);
	}


	var showNotification = function(apiResult) {
		console.log(apiResult);
		if (apiResult === 'success') {
			$('#resultSuccess').removeClass('d-none').slideDown(400, function() {
				setTimeout(function() {
					$('#resultSuccess').slideUp(400);
				}, 2000);
			});
		}
		else if (apiResult === 'error') {
			$('#resultError').removeClass('d-none').slideDown(400, function() {
				setTimeout(function() {
					$('#resultError').slideUp(400);
				}, 2000);
			});
		}
	}
		

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
		
		var tweetText = $('#tweetText').val().trim();

		if (tweetText != '') {
			createTweet(getCurrentDate(), tweetText);
		}

		tweetText = wrapURLs(tweetText, true);

		// console.log($('#postNewTweet').serialize());

		var sendData = "tweetText=" + tweetText;

		$.ajax({
			url: 'api.php',
			type: 'POST',
			data: sendData,

			success: function(html) {
				// console.log(html);
				showNotification(html);
				if (html === 'success') {
					countLikes();
				}
			}
		});
		
	});

	$('.like').on('click', function(e) {

		var likeId = $(this).attr('id');
		console.log(likeId);
		// e.preventDefault();
		if($(this).hasClass('active')) {
			$(this).removeClass("active");
			$(this).find('.fa-heart').removeClass('fas').addClass('far');
			likes--;
			countLikes();
		}
		else {
			$(this).addClass("active");
			$(this).find('.fa-heart').removeClass('far').addClass('fas');
			likes++;
			countLikes();
		}
	})


});