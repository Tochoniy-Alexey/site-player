$(function(){
	
	$(".toggle-mnu").click(function() {
	  $(this).toggleClass("on");
	  $(".main-mnu").slideToggle();
	  return false;
	});

 //first carousel
$('.slick-carousel').slick();

// player start
	
	// tabs
	$(".tab_item").not(":first").hide();
	$(".wrapper .tab").click(function() {
	$(".wrapper .tab").removeClass("active").eq($(this).index()).addClass("active");
	$(".tab_item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("active");
// tabs end

var audio;

//Hide Pause Initially
$('#pause').hide();
	
//Initializer - Play First Song
initAudio($('.playlist li:first-child'));
	
function initAudio(element){
	var song = element.attr('song');
    var title = element.text();
    var artist = element.attr('artist');

	//Create a New Audio Object
	audio = new Audio(song);
	

		$('#audio-player .title').text(title);
    $('#audio-player .artist').text(artist);	
	
		
	$('.playlist li').removeClass('active');
    element.addClass('active');


}


//Play Button
$('#play').click(function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	$('#fill').fadeIn(400);
	showDuration();
});

//Pause Button
$('#pause').click(function(){
	audio.pause();
	$('#pause').hide();
	$('#play').show();
});
	

//Next Button
$('#next').click(function(){
    audio.pause();
    var next = $('.playlist li.active').next();
    if (next.length == 0) {
        next = $('.playlist li:first-child');
    }
    initAudio(next);
	audio.play();
	showDuration();
});

//Prev Button
$('#prev').click(function(){
    audio.pause();
    var prev = $('.playlist li.active').prev();
    if (prev.length == 0) {
        prev = $('.playlist li:last-child');
    }
    initAudio(prev);
	audio.play();
	showDuration();
});

//Playlist Song Click
$('.playlist li').click(function () {
    audio.pause();
    initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	audio.play();
	showDuration();
});

	
//Time Duration
function showDuration(){
	$(audio).bind('timeupdate', function(){
		//Get hours and minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime / 60) % 60);
		//Add 0 if seconds less than 10
		if (s < 10) {
			s = '0' + s;
		}
		$('#duration').html(m + '.' + s);	
		var value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((94 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width',value+'%');

	});
};

// calendar start
function init() {
	$.getJSON("concerts.json", concertOut);
}

function concertOut(data) {
	var out='';
	out +=`<li class="hidden_li"><p>!ALEXANDRA PALACE, 10/03/201</p><p>LONDON, UNITED KINGDOM</p></li>`;
	for (var key in data) {
		out +=`<li class="opacity"><p >${data[key].concertHall}, ${data[key].date}</p><br><p>${data[key].city}</p></li>`;
	}
	$('.out').html(out);
}
init();
// calendar end

// scroll calendar start
    var swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
       slidesPerView: 'auto',
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      mousewheel: true,
    });
// scroll calendar end


});