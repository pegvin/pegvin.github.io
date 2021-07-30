// https://api.quotable.io/random
// https://github.com/lukePeavey/quotable

var loader = document.getElementById("loader");
var container = document.getElementById("container");

async function fetchQuote() {
	container.style.display = 'none';
	loader.style.display = 'initial';

	response = await fetch('https://api.quotable.io/random');
	data = await response.json();

	document.getElementById("quote").innerText = data.content;
	document.getElementById("author").innerText = data.author;

	container.style.display = 'initial';
	loader.style.display = 'none';
}

window.addEventListener("load", function(){
	document.getElementById("newQuote").addEventListener("click", fetchQuote);
	fetchQuote();
});