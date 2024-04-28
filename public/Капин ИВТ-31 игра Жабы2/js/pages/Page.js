class Page {
	$root = null;

	constructor(root) {
		this.$root = root;
	}

	// Жизненный цикл страницы
	onInit() { }
	onDestroy() { }

	// Шаблон
	render() { }

	remove() {
		this.onDestroy();
		this.$root.removeAllChild();
	}
}
