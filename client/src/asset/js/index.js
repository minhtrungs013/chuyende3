const menunavi = document.getElementsByClassName("navigation__menu");
const navi = document.getElementsByClassName("navigation");

menunavi.onclick =  () => {
  navi.classList.toggle("open");
};

const menuitem = document.querySelectorAll(".menu-item");

function activelink(item) {
  menuitem.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
menuitem.forEach((item) => item.addEventListener("click", activelink));
