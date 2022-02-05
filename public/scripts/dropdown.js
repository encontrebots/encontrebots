let toggle = document.querySelector('.navbar-burger');
let menu = document.querySelector('.navbar-menu');

let dropBtn = document.querySelector('.droplist');
let dropdown = document.querySelector('.has-dropdown');
dropBtn.addEventListener('click', () => {
	dropdown.classList.toggle('is-active');
	dropdown.classList.toggle('is-hidden');
});

toggle.addEventListener('click', () => {
	menu.classList.toggle('is-active');
	toggle.classList.toggle('is-active');
});