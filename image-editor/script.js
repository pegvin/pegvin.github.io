if (window.innerHeight > 800 && window.innerWidth > 1200) {
	var imageEditor = new tui.ImageEditor('#editorHolder', {
		includeUI: {
			loadImage: { path: 'https://source.unsplash.com/random/900x600', name: 'Untitled', },
			theme: darkTheme, initMenu: 'text', menuBarPosition: 'bottom',
		},

		cssMaxWidth: 700, cssMaxHeight: 500, usageStatistics: true,
	});

	window.onresize = function () { imageEditor.ui.resizeEditor(); };
}
else {
	alert("Your Device isn't Supported\nError: Screen_Size_Small")
}