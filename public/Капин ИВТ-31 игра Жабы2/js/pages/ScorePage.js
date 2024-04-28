class ScorePage extends Page {
	constructor(root) {
		super(root);
		this.$root.append(this.render());
	}

	render() {
		const $main = w("main").class("score-page");

		const $bgImage = w("img")
			.src(imgPath("start-bg.jpg"))
			.class("score-page__background");

		const $scoreTable = this.createScoreTable();

		return $main.append($bgImage, $scoreTable);
	}

	goBack() {
		store.page = pages.start;
	}

	createScoreTable() {
		const $scoresWrapper = w("div").class("score-page__wrapper");

		const $backButton = w("button")
			.setAttribute("type", "button")
			.class("score-page__back")
			.text("Выйти")
			.on("click", () => this.goBack());

		const $text = w("div").class("score-page__title").text("Реузальты");

		const results = (safeStorage.get("results") ?? []).sort((a, b) => {
			return a - b;
		});

		const $rowWrapper = w("div").class("score-page__row-wrapper");

		const tableRows = results.map((time) => {
			const $row = w("div").class("score-page__row");
			const $winText = w("div").class("score-page__row-text").text("Победа");

			const $time = w("div")
				.class("score-page__row-text")
				.text(formatTime(time));

			return $row.append($winText, $time);
		});

		return $scoresWrapper.append(
			$text,
			$rowWrapper.append(...tableRows),
			$backButton
		);
	}
}
