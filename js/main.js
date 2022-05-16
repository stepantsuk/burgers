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
        //console.log(memberReview);
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

/// слайдер вариант 1

// let sliderLeft = document.querySelector("#sliderLeft");
// let slider = document.querySelector("#slider");
// let sliderRight = document.querySelector("#sliderRight");

// let moveSlider = (direction, e) => {
//   e.preventDefault();
//   if (direction === "right") {
//     slider.appendChild(slider.firstElementChild);
//   } if (direction === "left") {
//     slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
//   }
// };

// sliderLeft.addEventListener("click", (e)=> {
//   moveSlider("left", e)
// });

// sliderRight.addEventListener("click", (e)=> {
//   moveSlider("right", e)
// })

/// слайдер вариант 2

let sliderLeft = document.querySelector("#sliderLeft");
let slider = document.querySelector("#slider");
let sliderRight = document.querySelector("#sliderRight");
let sliderWidth = parseInt(getComputedStyle(slider).width);
let sliderItemCounter = slider.children.length;

let moveSliderRight = (e) => {
  e.preventDefault();
  let sliderPosition = parseInt(getComputedStyle(slider).right);
  

  if (sliderPosition < (sliderItemCounter - 1) * sliderWidth) {
    slider.style.right = sliderPosition + sliderWidth + "px";
  }

  if (sliderPosition == (sliderItemCounter - 1) * sliderWidth) {
    slider.style.right = 0 + "px";
  }
};

let moveSliderLeft = (e) => {
  e.preventDefault();
  let sliderPosition = parseInt(getComputedStyle(slider).right);

  if (sliderPosition > 0) {
    slider.style.right = sliderPosition - sliderWidth + "px";
  }

  if (sliderPosition == 0) {
    slider.style.right = (sliderItemCounter - 1) * sliderWidth + "px";
  }
};

window.addEventListener("resize", () => {
  let sliderPosition = 0;
  slider.style.right = sliderPosition;
  sliderWidth = parseInt(getComputedStyle(slider).width);
});

sliderLeft.addEventListener("click", (e) => { moveSliderLeft(e) });

sliderRight.addEventListener("click", (e) => { moveSliderRight(e) });