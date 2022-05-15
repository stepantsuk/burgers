/// модальное окно в адаптиве, бургер меню
/// 
let icon = document.querySelector("#hamburger-menu-icon");
let menu = document.querySelector("#hamburger-menu");

let toggleMenu = (e) => {
  e.preventDefault();
  icon.classList.toggle("hamburger-menu-icon--active");
  menu.classList.toggle("hamburger-menu--active");
};

icon.addEventListener("click", toggleMenu);
