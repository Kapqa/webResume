class Game {
	$root = w("#root");

	activePage = null;
	pages = {
		[pages.start]: () => new StartPage(this.$root),
		[pages.game]: () => new GamePage(this.$root),
		[pages.score]: () => new ScorePage(this.$root),
	};

	constructor() {
		store.subscribe("page", (pageName) => {
			this.renderPage(pageName);
		});
	}

	renderPage(pageName) {
		const pageCallback = this.pages[pageName];

		if (!pageCallback) {
			throw new Error(pageName, "Такой страницы не существует");
		}

		if (this.activePage) {
			this.activePage.remove();
		}

		this.activePage = pageCallback();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new Game();
});
