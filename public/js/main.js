function Cache_GetTimeSinceEpoch_InHours() {
	return parseInt(new Date().getTime() / 3.6e6);
}

function Cache_Get(modName, id, maxTime /* Default 1 */) {
	maxTime = maxTime || 1;

	let item = localStorage.getItem(`${modName}-${id}`);
	if (!item) return null;

	item = JSON.parse(item);
	if (Cache_GetTimeSinceEpoch_InHours() - item.time > maxTime /* Return null if cached for more than 1 hours */) {
		localStorage.removeItem(`${modName}-${id}`);
		return null;
	}

	return item.data;
}

async function Cache_Set(modName, id, data) {
	localStorage.setItem(`${modName}-${id}`, JSON.stringify({ data: data, time: Cache_GetTimeSinceEpoch_InHours() }));
}

function ThemeButtonInit() {
	let nav = document.querySelector("body > header > nav");
	if (!nav) return;

	const cached_theme = Cache_Get("main.js", "page-theme", 876600) || "system";

	let select = document.createElement("select");
	select.setAttribute("tabindex", "0");
	select.setAttribute("aria-pressed", "false");
	select.setAttribute("aria-label", "Select Theme");
	select.setAttribute("title", "Select Theme");

	select.addEventListener("change", function(e) {
		const v = select.value.toLowerCase();
		switch (v) {
			case "system": document.querySelector("html").className = ""; break;
			case "light":  document.querySelector("html").className = "force-light"; break;
			case "dark":   document.querySelector("html").className = "force-dark"; break;
		}
		Cache_Set("main.js", "page-theme", v);
	});

	[ "SYSTEM", "LIGHT", "DARK" ].forEach(function(v, i) {
		let option = document.createElement("option");
		option.setAttribute("value", v.toLowerCase());
		option.innerText = v;
		select.appendChild(option);

		if (v.toLowerCase() == cached_theme) {
			select.value = v.toLowerCase();
			select.dispatchEvent(new Event("change"));
		}
	});

	nav.appendChild(select);
}

window.addEventListener("load", function() {
	ThemeButtonInit();

	if (typeof hljs != 'undefined') {
		hljs.highlightAll();
		hljs.initLineNumbersOnLoad();
	}
});
