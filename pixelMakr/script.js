var colorInput = document.getElementById("colorPicker");
var selectTable = document.getElementById("pixelCanvas");
var formInput = document.getElementById("sizePicker");
var heightInput = document.getElementById("inputHeight");
var widthInput = document.getElementById("inputWidth");
var brushTool = document.getElementById("brush");
var eraseTool = document.getElementById("eraser");

brushTool.checked = true;
eraseTool.checked = false;

formInput.addEventListener("submit", function (e) { // Create Grid on Submit
	selectTable.innerHTML = "";
	e.preventDefault();
	makeGrid(heightInput, widthInput);
	addColor(colorInput);
});

function makeGrid() { // Make The Grid
	for (let i = 0; i < heightInput.value; i++) {
		const row = selectTable.insertRow();
		for (let n = 0; n < widthInput.value; n++) { row.insertCell(); }
	}
}

function addColor(color) { // Add Color
	const allCells = document.querySelectorAll("td");
	let isDrawing = false;
	for (let i = 0; i < allCells.length; i++) {
		allCells[i].addEventListener("mousedown", function (e) {
			if (brushTool.checked) {
				isDrawing = true;
				e.target.style.backgroundColor = colorInput.value;
			}
			if (eraseTool.checked) {
				isDrawing = true;
				e.target.style.backgroundColor = "#fff";
			}
		});

		allCells[i].addEventListener("mousemove", function (e) {
			if (isDrawing === true) {
				if (brushTool.checked) e.target.style.backgroundColor = colorInput.value;
				if (eraseTool.checked) e.target.style.backgroundColor = "#fff";
			}
		});

		allCells[i].addEventListener("mouseup", function (e) {
			if (isDrawing === true) { isDrawing = false; }
		})
	}
};

window.onload = function() {
	selectTable.innerHTML = "";
	makeGrid(heightInput, widthInput);
	addColor(colorInput);
}

$("#downloadButton").on("click", function(e) {
	html2canvas(document.querySelector("#pixelCanvas")).then(canvas => {
		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		window.location.href = image;
	});
});