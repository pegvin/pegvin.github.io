function setRelTime(id) {
	element = document.getElementById(id);
	var RelTime = moment([2021, 5, 4]).fromNow(); // Year, Month, Date
	var text = RelTime + "<span>Aditya Mishra</span"
	element.innerHTML = text; }

function fetchURLQ(kuery) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get(kuery); } // IDK When i will use this

// for making image fullscreen
$('img[data-enlargeable]').addClass('img-enlargeable').click(function() {var src = $(this).attr('src');var modal;function removeModal(){ modal.remove();$('body').off('keyup.modal-close');}modal = $('<div>').css({ background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',backgroundSize: 'contain', width: '100%', height: '100%', position: 'fixed',zIndex: '10000', top: '0', left: '0', cursor: 'zoom-out' }).click(function(){removeModal();}).appendTo('body'); $('body').on('keyup.modal-close', function(e){if(e.key === 'Escape'){removeModal();}});});

window.onload = () => {
	$('.confirm').on('click', function () { return confirm('Are you sure, you want to leave the site?\n'); });
	setRelTime("time1");

	var TtipElems = document.querySelectorAll("abbr.tip");
	const tooltippy = tippy(TtipElems, {animateFill: true,});
}