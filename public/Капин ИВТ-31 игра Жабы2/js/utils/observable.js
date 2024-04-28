function observable(obj) {
	const subsribtions = new Map();

	function notify(key) {
		const value = obj[key];

		subsribtions.get(key).forEach((callback) => {
			callback(value);
		});
	}

	Object.keys(obj).forEach((key) => {
		let value = obj[key];

		if (typeof value !== "object" || value === null || Array.isArray(value)) {
			subsribtions.set(key, new Set());

			Object.defineProperty(obj, key, {
				get() {
					return value;
				},
				set(newValue) {
					value = newValue;
					notify(key);
				},
			});
		} else {
			reactive(value);
		}
	});

	obj.subscribe = function (key, callback, options = { emit: true }) {
		const subs = subsribtions.get(key);

		if (!subs) {
			throw new Error("Key not found: ", key);
		}

		subs.add(callback);

		if (options.emit) {
			callback(obj[key]);
		}

		return () => {
			subs.delete(callback);
		};
	};

	return obj;
}
