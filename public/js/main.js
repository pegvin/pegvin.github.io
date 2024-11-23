function ShareButtonInit() {
	let nav = document.querySelector("body > nav");
	if (!nav) return;

	let link = document.createElement("a");
	link.setAttribute("href", "#");
	link.setAttribute("role", "button");
	link.setAttribute("tabindex", "0");
	link.setAttribute("aria-pressed", "false");
	link.setAttribute("aria-label", "Share The Post");
	link.setAttribute("title", "Share The Post");
	link.innerText = "share();";
	nav.appendChild(link);

	link.addEventListener("click", function(e) {
		e.preventDefault();
		if (navigator.share) {
			window.navigator.share({
				url: window.location.toString()
			});
		} else {
			window.navigator.clipboard.writeText(window.location.toString());
		}

		link.innerText = "...";
		setTimeout(function() {
			link.innerText = "share();";
		}, 500);
	});
}

window.addEventListener("load", async function() {
	if (window.location.pathname.startsWith("/post/")) {
		ShareButtonInit();
	}

	if (typeof hljs != 'undefined') {
		hljs.highlightAll();
		hljs.initLineNumbersOnLoad();
	}
});
