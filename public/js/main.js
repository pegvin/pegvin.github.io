const SHARE_ICON = `<span class="material-symbols-sharp ms-icon">share</span>`;
const  TICK_ICON = `<span class="material-symbols-sharp ms-icon">check</span>`;
const  LIKE_ICON = `<span class="material-symbols-sharp ms-icon">thumb_up</span>`;
const ERROR_ICON = `<span class="material-symbols-sharp ms-icon">error</span>`;
const HOURGLASS_ICON = `<span class="material-symbols-sharp ms-icon">hourglass_empty</span>`;

function ShareButtonInit() {
	let nav = document.querySelector("body > header > div > nav");
	if (!nav) return;

	let link = document.createElement("a");
	link.setAttribute("href", "#");
	link.setAttribute("role", "button");
	link.setAttribute("tabindex", "0");
	link.setAttribute("aria-pressed", "false");
	link.setAttribute("aria-label", "Share The Post");
	link.setAttribute("title", "Share The Post");
	link.innerHTML = SHARE_ICON;
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

		link.innerHTML = TICK_ICON;
		setTimeout(function() {
			link.innerHTML = SHARE_ICON;
		}, 500);
	});
}

function GetTimeSinceEpoch_InHours() {
	return parseInt(new Date().getTime() / 3.6e6);
}

function LikeButtonInit() {
	if ((new URL(window.location)).hostname != "0ref.pages.dev") return;

	function _SetLike(btn, likes, animate) {
		btn.innerHTML = animate ? TICK_ICON : "";
		setTimeout(function() {
			btn.innerHTML = `${LIKE_ICON}<span>${likes} ${likes == 0 ? "Likes" : (likes == 1 ? "Like" : "Likes")}</span>`;
		}, animate ? 500 : 0);
	}

	const WORKER_URL = new URL("https://minianal-like.0ref.workers.dev/");
	let link = document.createElement("a");
	let nav = document.querySelector("body > header > div > nav");

	link.innerHTML = LIKE_ICON;
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
		_SetLike(link, likesCached, false);
	} else {
		fetch(workerSubURL.toString())
			.then(function(res) {
				return res.json();
			})
			.then(function(json) {
				if (json.status == 200) {
					_SetLike(link, json.likes, false);
					Cache_Set("like.js", currURL, json.likes);
				}
			});
	}

	link.addEventListener("click", function(e) {
		e.preventDefault();
		link.innerHTML = HOURGLASS_ICON;

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
			} else {
				throw new Error(`Failed with message '${json.msg}' (status: ${json.status})`);
			}
		}).catch(function(err) {
			link.innerHTML = ERROR_ICON;
			setTimeout(function() {
				link.innerHTML = LIKE_ICON;
			}, 500);
		});
	});
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
