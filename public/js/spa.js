// This work is marked with CC0 1.0 Universal.
// To view a copy of this license, visit http://creativecommons.org/publicdomain/zero/1.0

function CacheSet(name, data) {
	localStorage.setItem(name, JSON.stringify({
		time: Date.now() / 1000, // Number of seconds since Unix epoch
		data: data
	}));
}

function CacheGet(name) {
	let item = localStorage.getItem(name);
	if (item) {
		item = JSON.parse(item);
		// If difference between dates is greater than 5 minutes
		if ((Date.now() / 1000) - item.time > (5 * 60)) {
			return null;
		}
		return item.data;
	}
	return null;
}

async function FetchHTML(url) {
	try {
		let cache = CacheGet(`minispa-${url}`);
		if (cache) {
			return cache;
		} else {
			const response = await fetch(url);
			const text = await response.text();
			CacheSet(`minispa-${url}`, text);
		}
	} catch (e) {
		console.error(e);
		return null;
	}
}

function AttachHooks() {
	let links = document.querySelectorAll("a");

	links = Array.from(links).filter((link) => {
		return (
			link.getAttribute("data-no-spa") == null && // Skip any element with `data-no-spa` specified
			(
				link.getAttribute("href").startsWith("/") ||
				link.getAttribute("href").startsWith("./")
			)
		);
	});

	links.forEach(function(link) {
		let onHover = function(e) {
			FetchHTML(link.href);
		}

		link.addEventListener("mouseenter", onHover);
		link.addEventListener("touchstart", onHover);

		let onClick = function(e) {
			e.preventDefault(); // prevent default link click behavior
			GotoURL(link.href);
			PushHistory(link.href);
		};

		link.addEventListener("click", onClick);
		link.addEventListener("dblclick", onClick);
	});
}

function UpdateDoc(html) {
	let parser = new DOMParser();
	let htmlDoc = parser.parseFromString(html, "text/html");

	document.body = htmlDoc.body;
	document.title = htmlDoc.title;
}

function PushHistory(url) {
	window.history.pushState({}, "", url); // Push the `url` to browser's history
}

function GotoURL(url) {
	FetchHTML(url)
		.then(function(html) {
			UpdateDoc(html);
			window.dispatchEvent(new Event("load"));
		})
		.catch(function(err) {
			console.error(err);
		});
}

window.addEventListener("popstate", function(e) {
	if (window.location.hostname == e.target.location.hostname) {
		e.preventDefault(); // prevent default behavior of navigating to that page as the code will do that
		GotoURL(e.target.location.href, null);
	}
});

window.addEventListener("load", function() {
	AttachHooks();
});
