let activeBtns;
let btns;
let bgc;
let timer;
let startBtn;
let skipBtn;
let title;
let active = '.pomodoro-btn';
let countTime;
let minutes = 25;
let seconds = 0;
let flag = true;
let start = true;
let count = 0;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	activeBtns = document.querySelectorAll('.box__btn');
	bgc = document.querySelector('.bgc');
	timer = document.querySelector('.box__timer');
	startBtn = document.querySelector('.box__start');
	skipBtn = document.querySelector('.box__skip');
	title = document.querySelector('.box__title');

	btns = ['.pomodoro-btn', '.short-btn', '.long-btn'];
};

const prepareDOMEvents = () => {
	activeBtns.forEach((btn) => {
		btn.addEventListener('click', activeBtn);
	});
	startBtn.addEventListener('click', toggleStart);
	skipBtn.addEventListener('click', skip);
};
const toggleStart = () => {
	title.textContent = 'Just do it';
	skipBtn.classList.toggle('box__skip--active');

	if (start) {
		if (flag) {
			countTime = setInterval(() => {
				if (seconds === 0) {
					if (minutes > 0) {
						seconds = 60;
						minutes--;
						seconds--;
						timer.textContent = `${minutes}:${seconds}`;
					} else {
						stop();
						moveTo();
						skipBtn.classList.remove('box__skip--active');
					}
				} else if (seconds > 10 && seconds < 60) {
					seconds--;
					timer.textContent = `${minutes}:${seconds}`;
				} else if (seconds <= 10) {
					seconds--;
					timer.textContent = `${minutes}:0${seconds}`;
				}
			}, 1000);
		}
		start = false;
		flag = false;
		startBtn.textContent = 'stop';
	} else {
		stop();
	}
};

const stop = () => {
	startBtn.textContent = 'start';
	clearInterval(countTime);
	flag = true;
	start = true;
};
const skip = () => {
	if (confirm('Are you sure you want to finish the round early?') == true) {
		stop();
		skipBtn.classList.remove('box__skip--active');
		moveTo();
	}
};

const moveTo = () => {
	count++;
	if (active === btns[0]) {
		if (count < 6) {
			activeBtns[0].classList.toggle('box__btn--active');
			activeBtns[1].classList.toggle('box__btn--active');

			active = btns[1];
			changeMode(btns[1]);
		} else {
			activeBtns[0].classList.toggle('box__btn--active');
			activeBtns[2].classList.toggle('box__btn--active');

			active = btns[2];
			changeMode(btns[2]);
			count = 0;
		}
	} else if (active === btns[1]) {
		activeBtns[0].classList.toggle('box__btn--active');
		activeBtns[1].classList.toggle('box__btn--active');
		active = btns[0];
		changeMode(btns[0]);
	} else if (active === btns[2]) {
		activeBtns[2].classList.toggle('box__btn--active');
		activeBtns[0].classList.toggle('box__btn--active');
		active = btns[0];
		changeMode(btns[0]);
	}
};

const activeBtn = (e) => {
	activeBtns.forEach((active) => {
		active.classList.remove('box__btn--active');
	});
	btns.forEach((btn) => {
		if (e.target.matches(btn)) {
			e.target.classList.add('box__btn--active');
			active = btn;
			changeMode(btn);
		}
	});
};
const changeMode = (activeBtn) => {
	if (activeBtn === btns[0]) {
		title.textContent = 'Just do it';
		bgc.classList.remove('bgc--second');
		bgc.classList.remove('bgc--third');
		timer.textContent = '25:00';
		minutes = 25;
		seconds = 0;
	} else if (activeBtn === btns[1]) {
		title.textContent = 'Take a breath';
		bgc.classList.remove('bgc--third');
		bgc.classList.add('bgc--second');
		timer.textContent = '5:00';
		minutes = 5;
		seconds = 0;
	} else {
		title.textContent = 'You you deserve it';
		bgc.classList.remove('bgc--second');
		bgc.classList.add('bgc--third');
		timer.textContent = '15:00';
		minutes = 15;
		seconds = 0;
	}
};

window.addEventListener('DOMContentLoaded', main);
