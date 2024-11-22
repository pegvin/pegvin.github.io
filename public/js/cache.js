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
	localStorage.setItem(`${modName}-${id}`, JSON.stringify({ data: data, time: GetTimeSinceEpoch_InHours() }));
}

