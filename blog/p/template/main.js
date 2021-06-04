function setRelTime(id) {
	element = document.getElementById(id);
	var RelTime = moment([2021, 0, 29]).fromNow(); // Year, Month, Date
	var text = RelTime + "<span>Aditya Mishra</span"
	element.innerHTML = text; }

function fetchURLQ(kuery) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get(kuery); } // IDK When i will use this

// for making image fullscreen
$('img[data-enlargeable]').addClass('img-enlargeable').click(function() {var src = $(this).attr('src');var modal;function removeModal(){ modal.remove();$('body').off('keyup.modal-close');}modal = $('<div>').css({ background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',backgroundSize: 'contain', width: '100%', height: '100%', position: 'fixed',zIndex: '10000', top: '0', left: '0', cursor: 'zoom-out' }).click(function(){removeModal();}).appendTo('body'); $('body').on('keyup.modal-close', function(e){if(e.key === 'Escape'){removeModal();}});});

window.onload = () => {
	$('.confirm').on('click', function () { return confirm('Are you sure?'); });
	setRelTime("time1");

	var tipPhys = document.getElementById("tipPhys");
	const tooltippy = tippy(tipPhys, {animateFill: true,});
}