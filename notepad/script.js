let saveBtn = document.getElementById('save');
let copyBtn = document.getElementById('copy');
let themeBtn = document.getElementById('theme');
let textArea = document.getElementById('textArea');
let filenameInput = document.getElementById('filename');
let theme = Cookies.get("theme");

if (theme === undefined) theme = "light"; Cookies.set("theme", "light");

function switchTheme() {
	if (theme == "light") {
		textArea.style.backgroundColor = "#eeeeee";
		textArea.style.color = "#252525";

		filenameInput.style.backgroundColor = "#cccccc";
		filenameInput.style.color = "#252525";
		document.getElementById("themeIcon").className = "fas fa-moon";
		theme = "dark";
		Cookies.set("theme", "light");
	}
	else {
		textArea.style.backgroundColor = "#252525";
		textArea.style.color = "#ffffff";

		filenameInput.style.backgroundColor = "#353535";
		filenameInput.style.color = "#ffffff";
		document.getElementById("themeIcon").className = "fas fa-sun";
		theme = "light";
		Cookies.set("theme", "dark");
	}
}

function saveTextAsFile() {
	var textToWrite = textArea.value;
	var fileBlob = new Blob([ textToWrite ], { type: 'text/plain' });
	var fileNameToSaveAs = filenameInput.value;

	if (fileNameToSaveAs == '') fileNameToSaveAs = "untitled.txt";

	try {
		var isFileSaverSupported = !!new Blob;
		var blob = new Blob([textToWrite], {type: "text/plain;charset=utf-8"});
		FileSaver.saveAs(blob, fileNameToSaveAs);
	} catch (e) {
		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		downloadLink.href = window.URL.createObjectURL(fileBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
		downloadLink.click();
	}
}

saveBtn.addEventListener('click', saveTextAsFile);
themeBtn.addEventListener('click', switchTheme);
copyBtn.addEventListener('click', function(e) { navigator.clipboard.writeText(textArea.value) });
textArea.focus();
switchTheme();
destroyClickedElement = (event) => { document.body.removeChild(event.target); }