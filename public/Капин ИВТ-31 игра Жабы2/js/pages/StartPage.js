class StartPage extends Page {
	constructor(root) {
		super(root);
		this.$root.append(this.render());
	}

	render() {
		const $main = w("main").class("start-page");

		const $bgImage = w("img")
			.src(imgPath("start-bg.jpg"))
			.class("start-page__background");

		const $buttonsWrapper = w("div").class("start-page__buttons-wrapper");

		const $scoreButton = w("button")
			.setAttribute("type", "button")
			.text("Таблица рекордов")
			.class("start-page__button")
			.on("click", () => {
				store.page = pages.score;
			});

		const $gameButton = w("button")
			.setAttribute("type", "button")
			.text("Играть!")
			.class("start-page__button")
			.on("click", () => {
				store.page = pages.game;
			});

		return $main.append(
			$bgImage,
			$buttonsWrapper.append($gameButton, $scoreButton)
		);
	}
}
