function createFrogs(count, { isWinningPosition = false } = {}) {
	const frogsCount = Math.floor(count / 2) * 2;
	const half = Math.ceil((frogsCount + 1) / 2);

	return Array.from({ length: frogsCount + 1 }).map((_, idx) => {
		if (idx + 1 < half) {
			return { side: isWinningPosition ? "right" : "left", id: idx };
		}
		if (idx + 1 > half) {
			return { side: isWinningPosition ? "left" : "right", id: idx };
		}
		return null;
	});
}
