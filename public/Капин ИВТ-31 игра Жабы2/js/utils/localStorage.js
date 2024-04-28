class CustomLocalStorage {
	get(key) {
		const item = localStorage.getItem(key);

		if (item) {
			try {
				return JSON.parse(item);
			} catch (_) {
				return null;
			}
		}

		return null;
	}

	set(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

const safeStorage = new CustomLocalStorage();
