var toggle = document.querySelector(".navbar-burger")
var menu = document.querySelector(".navbar-menu")

var dropBtn = document.querySelector(".dropdown");
var dropdown = document.querySelector(".has-dropdown");
dropBtn.addEventListener("click", () => {
  dropdown.classList.toggle("is-active");
  dropdown.classList.toggle("is-hidden")
})

toggle.addEventListener("click", () => {
  menu.classList.toggle("is-active");
  toggle.classList.toggle("is-active");
})

function redirect(link) {
  window.location.href = `${link}`;
}