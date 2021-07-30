saveBtn = document.getElementById('save');
copyBtn = document.getElementById('copy');
textArea = document.getElementById('textArea');
filenameInput = document.getElementById('filename');

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
copyBtn.addEventListener('click', function(e) { navigator.clipboard.writeText(textArea.value) });
textArea.focus();
destroyClickedElement = (event) => { document.body.removeChild(event.target); }