// wrapper
const FROGS_WRAPPER_MAX_WIDTH = 940;
const FROGS_WRAPPER_MAX_HEIGHT = 100;

// frogs
const FROG_SQUARE_SIDE_SIZE = 100;
const FORGS_DISTANCE = 40;
const MULTIPLIER = FROG_SQUARE_SIDE_SIZE + FORGS_DISTANCE;
const FROGS_COUNT = 6;

// positions
const INITIAL_FROGS = createFrogs(FROGS_COUNT);
const WINNING_FROGS = createFrogs(FROGS_COUNT, { isWinningPosition: true });
const MAX_WINDOW_WIDTH = 1080;
const MAX_WINDOW_HEIGHT = 600;

function soundClick() {
	var audio = new Audio(); // Создаём новый элемент Audio
	audio.src = 'frogSound.mp3'; // Указываем путь к звуку "клика"
	audio.autoplay = true;
  }
  function ambience() {
	var ambience = new Audio(); // Создаём новый элемент Audio
	ambience.src = 'swampAmbience.mp3'; // Указываем путь к звуку "клика"
	ambience.autoplay = true;
  }
class GamePage extends Page {
	state = observable({
		timer: 0,
		frogs: INITIAL_FROGS,
		isJumping: false,
		ratio: 0,
	});

	isPause = false;
	unsubHandlers = [];

	constructor(root) {
		super(root);
		this.onResize = this.onResize.bind(this);
		this.init();
	}

	onDestroy() {
		this.unsubHandlers.forEach((handler) => handler());
	}

	render() {
		const $main = w("main").class("game-page");

		const $bgImage = w("img")
			.src(imgPath("game-bg.jpeg"))
			.class("game-page__background");

		const $timer = w("div")
			.class("game-page__timer")
			.interaction((node) => {
				const unsubState = this.state.subscribe("timer", (timer) => {
					node.text(formatTime(timer));
				});

				const intervalId = setInterval(() => {
					if (!this.isPause) {
						this.state.timer += 1;
					}
				}, 1000);

				this.unsubHandlers.push(unsubState, () => clearInterval(intervalId));
			});

		const $backButton = w("button")
			.setAttribute("type", "button")
			.class("game-page__back")
			.text("Выйти")
			.on("click", () => this.goBack());

		const $restartButton = w("button")
			.setAttribute("type", "button")
			.class("game-page__restart")
			.text("Начать заново")
			.on("click", () => this.restartGame());

		const $frogsWrapper = w("div")
			.class("game-page__frogs-wrapper")
			.interaction((node) => {
				const unsubState = this.state.subscribe("ratio", (ratio) => {
					node.style({
						width: `${ratio * FROGS_WRAPPER_MAX_WIDTH}px`,
						height: `${ratio * FROGS_WRAPPER_MAX_HEIGHT}px`,
					});
				});

				this.unsubHandlers.push(unsubState);
			});

		const frogs = this.state.frogs.map((info, idx) => {
			if (!info) {
				return null;
			}

			let { side, id } = info;
			let currentPosition = idx;
			ambience();
			const $button = w("button")
				.setAttribute("type", "button")
				.class("game-page__frog")
				.on("click", () => {
					const length = this.state.frogs.length;
					for (let i = 0; i < length; i++) {
						const frog = this.state.frogs[i];
						if (!frog || frog.id !== id) {
							continue;
						}

						const direction = frog.side === "left" ? 1 : -1;

						if (
							(direction > 0 && i === length - 1) ||
							(direction < 0 && i === 0)
						) {
							break;
						}

						if (!this.state.frogs[i + 1 * direction]) {
							const copyFrog = [...this.state.frogs];
							copyFrog[i] = null;
							copyFrog[i + 1 * direction] = frog;
							this.state.frogs = copyFrog;
							soundClick();
							break;
						}

						const jumpPos = i + 2 * direction;
						if (
							jumpPos >= 0 &&
							jumpPos <= length - 1 &&
							!this.state.frogs[jumpPos]
						) {
							const copyFrog = [...this.state.frogs];
							copyFrog[i] = null;
							copyFrog[jumpPos] = frog;
							this.state.frogs = copyFrog;
							soundClick();
							break;
						}

						break;
					}
				})
				.interaction((node) => {
					const unsubRatio = this.state.subscribe("ratio", (ratio) => {
						const side = ratio * FROG_SQUARE_SIDE_SIZE;
						const position = currentPosition * (ratio * MULTIPLIER);

						node.style({
							width: `${side}px`,
							height: `${side}px`,
							transform: `translate(${position}px, 0)`,
						});
					});

					const unsubJump = this.state.subscribe("isJumping", (isJumping) => {
						node.disabled(isJumping);
					});

					const unsubPos = this.state.subscribe(
						"frogs",
						(frogs) => {
							for (let i = 0; i < frogs.length; i++) {
								const { ratio } = this.state;
								const frog = frogs[i];

								if (!frog || frog.id !== id) {
									continue;
								}
								if (currentPosition === i) {
									break;
								}

								this.state.isJumping = true;

								const side = ratio * FROG_SQUARE_SIDE_SIZE;
								const prevPos = currentPosition * (MULTIPLIER * ratio);
								const newPos = i * (MULTIPLIER * ratio);
								const halfPos = newPos + (prevPos - newPos) / 2;
								currentPosition = i;

								node.style({
									width: `${side}px`,
									height: `${side}px`,
									transform: `translate(${halfPos}px, -150%)`,
								});

								setTimeout(() => {
									node.style({
										width: `${side}px`,
										height: `${side}px`,
										transform: `translate(${newPos}px, 0)`,
									});

									setTimeout(() => {
										this.state.isJumping = false;

										if (this.checkForWinningResult()) {
											this.showWiningDialog();
											const results = safeStorage.get("results") ?? [];
											results.push(this.state.timer);
											safeStorage.set("results", results);
											return;
										}

										if (this.checkForLosingResult()) {
											this.showLosingDialog();
											return;
										}
									}, 100);
								}, 100);

								break;
							}
						},
						{ emit: false }
					);

					this.unsubHandlers.push(unsubJump, unsubPos, unsubRatio);
				});

			// TODO: заменить "right-frog.png" на файл с картинкой
			const $frogImg = w("img")
				.src(side === "left" ? imgPath("frog.png") : imgPath("right-frog.png"))
				.class("game-page__frog-image");

			return $button.append($frogImg);
		});

		return $main.append(
			$bgImage,
			$backButton,
			$timer,
			$restartButton,
			$frogsWrapper.append(...frogs.filter(Boolean))
		);
	}

	checkForWinningResult() {
		const length = this.state.frogs.length;

		for (let i = 0; i < length; i++) {
			const curentFrog = this.state.frogs[i];
			const winningFrog = WINNING_FROGS[i];

			if (!curentFrog && !winningFrog) {
				continue;
			}
			if ((!curentFrog && winningFrog) || (curentFrog && !winningFrog)) {
				return false;
			}
			if (curentFrog.side !== winningFrog.side) {
				return false;
			}
		}

		return true;
	}

	checkForLosingResult() {
		const length = this.state.frogs.length;

		for (let i = 0; i < length; i++) {
			const frog = this.state.frogs[i];

			if (!frog) {
				continue;
			}

			const direction = frog.side === "left" ? 1 : -1;

			if ((direction > 0 && i === length - 1) || (direction < 0 && i === 0)) {
				continue;
			}

			if (!this.state.frogs[i + 1 * direction]) {
				return false;
			}

			const jumpPos = i + 2 * direction;

			if (jumpPos >= 0 && jumpPos <= length - 1 && !this.state.frogs[jumpPos]) {
				return false;
			}
		}

		return true;
	}

	showWiningDialog() {
		this.isPause = true;

		const $dialog = w("div").class("game-page__dialog-bg");
		const $wrapper = w("div").class("game-page__dialog-content-wrapper");

		const $text = w("div")
			.class("game-page__dialog-title")
			.text("Вы победили! :)");

		const $restartButton = w("button")
			.setAttribute("type", "button")
			.class("game-page__dialog-button")
			.on("click", () => {
				store.page = pages.score;
			})
			.text("Таблица рекордов");

		const $backtButton = w("button")
			.setAttribute("type", "button")
			.class("game-page__dialog-button")
			.on("click", () => this.goBack())
			.text("Выйти");

		this.$root.append(
			$dialog.append($wrapper.append($text, $restartButton, $backtButton))
		);
	}

	showLosingDialog() {
		this.isPause = true;

		const $dialog = w("div").class("game-page__dialog-bg");
		const $wrapper = w("div").class("game-page__dialog-content-wrapper");

		const $text = w("div")
			.class("game-page__dialog-title")
			.text("Вы проиграли :(");

		const $restartButton = w("button")
			.setAttribute("type", "button")
			.class("game-page__dialog-button")
			.on("click", () => {
				$dialog.remove();
				this.restartGame();
			})
			.text("Начать заново");

		const $backtButton = w("button")
			.setAttribute("type", "button")
			.class("game-page__dialog-button")
			.on("click", () => this.goBack())
			.text("Выйти");

		this.$root.append(
			$dialog.append($wrapper.append($text, $restartButton, $backtButton))
		);
	}

	goBack() {
		store.page = pages.start;
	}

	restartGame() {
		this.state.timer = 0;
		this.state.frogs = INITIAL_FROGS;
		this.isPause = false;
	}

	onResize() {
		const width = window.innerWidth;
		const height = window.innerHeight;

		const ratio = Math.min(
			width / MAX_WINDOW_WIDTH,
			height / MAX_WINDOW_HEIGHT
		);

		if (ratio >= 1) {
			if (this.state.ratio !== 1) {
				this.state.ratio = 1;
			}

			return;
		}

		if (this.state.ratio !== ratio) {
			this.state.ratio = ratio;
		}
	}

	init() {
		this.$root.append(this.render());

		this.onResize();

		window.addEventListener("resize", this.onResize);

		this.unsubHandlers.push(() =>
			window.removeEventListener("resize", this.onResize)
		);
	}
}
