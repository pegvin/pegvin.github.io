function windowSizeCheck() {
    if (window.innerWidth < 350 ) {
        alert("Your device width is less than 330px and website might look weird!"); }

    if (window.innerHeight < 530 ) {
        alert("Your device width is less than 510px and website might look weird!"); }
}

var charArr1 = ['◐','◓','◑','◒'];
var charArr2 = ['⬖','⬘','⬗','⬙'];
var i = 0

function windowTits() {
	window.document.title = charArr2[i] + " Dev's Blog " + charArr2[i]; i++;
	if (i > charArr2.length-1) { i = 0 } }

setInterval(windowTits, 150);

window.onload = (event) => {
	windowSizeCheck();
	document.getElementById("footerYear").innerHTML = new Date().getFullYear();
};