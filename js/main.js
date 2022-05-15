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

/// вертикальный аккордеон

let member = document.querySelectorAll(".member__link");

const verticalAccordeon = () => {
  member.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      let activeItem = document.querySelector(".member--active");
      if (activeItem) {
        let memberReview = activeItem.querySelector(".member__review");
        console.log(memberReview);
        memberReview.style.height = 0 + "px";
        activeItem.classList.remove("member--active")
      }
      if (!activeItem || e.target !== activeItem.querySelector(".member__link")) {
        let currentMember = e.target.closest(".member");
        currentMember.classList.add("member--active");

        currentMember.querySelector(".member__review").style.height = currentMember.querySelector(".member__review").scrollHeight + 'px';
      }
    })
  })
}

verticalAccordeon();