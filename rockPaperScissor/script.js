var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var scissor = document.getElementById("scissor");

let robotPick = ["rock", "paper", "scissor"];
let timearr = [200, 500, 699];

var humanScore = document.getElementById("humanScore");
var robotScore = document.getElementById("robotScore");

var loader = document.getElementById("loader");
loader.style.display = "none";

window.addEventListener("load", function(e) {
	document.getElementById("startButton").addEventListener("click", function() {
		document.getElementById("menu").style.display = "none";
		document.getElementById("game").style.display = "inherit";
		if (!jQuery.isEmptyObject(Cookies.get())) {
			humanScore.innerHTML = parseInt(Cookies.get("hScore"));
			robotScore.innerHTML = parseInt(Cookies.get("rScore"));
	}}),

	document.getElementById("endButton").addEventListener("click", function() {
		document.getElementById("menu").style.display = "inherit";
		document.getElementById("game").style.display = "none";
		Cookies.set("hScore", humanScore.innerHTML, { expires: 366 });
		Cookies.set("rScore", robotScore.innerHTML, { expires: 366 });
	}),

	rock.addEventListener("click", function(e) { checkWin("rock"); });
	paper.addEventListener("click", function(e) { checkWin("paper"); });
	scissor.addEventListener("click", function(e) { checkWin("scissor"); });	
});

function checkWin(pick) {
	loader.style.display = "inherit";
	let humanPick = pick;
	let timeTaken = timearr[rando(timearr).index];
	let picks = rando(robotPick).index;
	let whoWon;

	if (humanPick === "rock" && robotPick[picks] === "rock") whoWon = "tie";
	if (humanPick === "rock" && robotPick[picks] === "paper") whoWon = "robot";
	if (humanPick === "rock" && robotPick[picks] === "scissor") whoWon = "human";

	if (humanPick === "paper" && robotPick[picks] === "paper") whoWon = "tie";
	if (humanPick === "paper" && robotPick[picks] === "scissor") whoWon = "robot";
	if (humanPick === "paper" && robotPick[picks] === "rock") whoWon = "human";

	if (humanPick === "scissor" && robotPick[picks] === "scissor") whoWon = "tie";
	if (humanPick === "scissor" && robotPick[picks] === "rock") whoWon = "robot";
	if (humanPick === "scissor" && robotPick[picks] === "paper") whoWon = "human";

	setTimeout(function() {
		if (whoWon === "human") {
			let x = parseInt(humanScore.innerHTML);
			Toast.fire({ icon: null, title: "Robot Chose " + robotPick[picks] })
			x++; humanScore.innerHTML = x;
		}

		if (whoWon === "robot") {
			let x = parseInt(robotScore.innerHTML);
			Toast.fire({ icon: null, title: "Robot Chose " + robotPick[picks] })
			x++; robotScore.innerHTML = x;
		}

		if (whoWon === "tie") {
			Toast.fire({ icon: null, title: "LOL, it's A Tie" })
		}

		loader.style.display = "none";
	}, timeTaken);
}

const Toast = Swal.mixin({
	toast: true,
	position: 'bottom-end',
	showConfirmButton: false,
	timer: 5000,
	timerProgressBar: true,
	target: '#toast',
	didOpen: (toast) => {
	 	toast.addEventListener('click', Swal.close)
	}
})