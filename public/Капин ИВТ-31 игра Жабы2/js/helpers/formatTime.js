function formatTime(time) {
	let minutes = String(Math.floor(time / 60));
	let seconds = String(time % 60);

	while (minutes.length < 2) {
		minutes = "0" + minutes;
	}

	while (seconds.length < 2) {
		seconds = "0" + seconds;
	}

	return `${minutes}:${seconds}`;
}
