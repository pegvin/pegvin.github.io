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
	link.innerText = "Share";
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
			link.innerText = "Share";
		}, 500);
	});
}

function LikeButtonInit() {
	if ((new URL(window.location)).hostname != "pegv.in") return;

	function _SetLike(btn, likes) {
		btn.innerText = `${likes} ${likes == 0 ? "Likes" : (likes == 1 ? "Like" : "Likes")}`;
	}

	const WORKER_URL = new URL("https://minianal-like.0ref.workers.dev/");
	let link = document.createElement("a");
	let nav = document.querySelector("body > nav");

	link.innerText = "Like";
	link.setAttribute("href", "#");
	link.setAttribute("role", "button");
	link.setAttribute("tabindex", "0");
	link.setAttribute("aria-pressed", "false");
	link.setAttribute("aria-label", "Like The Post");
	link.setAttribute("title", "Like The Post");
	nav.appendChild(link);

	let currURL = new URL(window.location).pathname;
	if (!currURL.endsWith(".html")) {
		currURL = `${currURL}.html`;
	}

	let workerSubURL = new URL(WORKER_URL);
	workerSubURL.pathname = currURL;

	let likesCached = Cache_Get("like.js", currURL);
	if (likesCached != null || likesCached != undefined) {
		_SetLike(link, likesCached);
	} else {
		fetch(workerSubURL.toString())
			.then(function(res) {
				return res.json();
			})
			.then(function(json) {
				if (json.status == 200) {
					_SetLike(link, json.likes);
					Cache_Set("like.js", currURL, json.likes);
				}
			});
	}

	function _OnClick(e) {
		e.preventDefault();
		link.innerText = "...";

		fetch(WORKER_URL.toString(), {
			method: "POST",
			mode: "cors",
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
			body: currURL
		}).then(function(res) {
			return res.json();
		}).then(function(json) {
			if (json.status == 200) {
				_SetLike(link, json.likes);
				Cache_Set("like.js", currURL, json.likes, true);
				link.removeEventListener("click", _OnClick);
				link.addEventListener("click", function(e) { e.preventDefault(); });
			} else {
				throw new Error(`Failed with message '${json.msg}' (status: ${json.status})`);
			}
		}).catch(function(err) {
			link.innerText = "Failed!";
			setTimeout(function() {
				link.innerText = "Like";
			}, 500);
		});
	}

	link.addEventListener("click", _OnClick);
}

window.addEventListener("load", function() {
	if (window.location.pathname.startsWith("/post/")) {
		ShareButtonInit();
		LikeButtonInit();
	}

	if (typeof hljs != 'undefined') {
		hljs.highlightAll();
		hljs.initLineNumbersOnLoad();
	}
});
