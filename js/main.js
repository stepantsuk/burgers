/// модальное окно в адаптиве, бургер меню

let icon = document.querySelector("#hamburger-menu-icon");
let menu = document.querySelector("#hamburger-menu");

let toggleMenu = (e) => {
  e.preventDefault();
  icon.classList.toggle("hamburger-menu-icon--active");
  menu.classList.toggle("hamburger-menu--active");
};

icon.addEventListener("click", toggleMenu);

/// модальное окно отзывы "modal-review"

let modalReviews = document.querySelector("#modal-review");
//let btnReviews = document.querySelectorAll("#btn--reviews");
let modalForm = document.querySelector("#modal-form");
let reviewsList = document.querySelector(".reviews-list");
let contentReview = document.querySelector('#reviewOverlay').innerHTML;

let closeModalOverlay = (e) => {
  e.preventDefault();
  modalReviews.classList.remove("modal--active");
  document.querySelector("body").classList.remove("locked");
};

let openModalReview = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("btn--reviews")) {
    modalReviews.classList.add("modal--active");
    document.querySelector("body").classList.add("locked");
    document.querySelector(".modal__inner--review").innerHTML = contentReview;

    let closeModalBtn = document.createElement("a");
    closeModalBtn.classList.add("modal-review__close");
    closeModalBtn.setAttribute("href", "#")
    document.querySelector(".modal__inner--review").appendChild(closeModalBtn);
    closeModalBtn.addEventListener("click", closeModalOverlay);
    modalReviews.addEventListener("click", (e) => {
      if (e.target == modalReviews) { closeModalOverlay(e) };
    });

  };
};

reviewsList.addEventListener("click", openModalReview);

// btnReviews.forEach((item) => {
//   item.addEventListener("click", openModalReview)
// })


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

/// слайдер вариант 2 за счет изменения style.right c iief

let applySlider = (() => {
  let sliderLeft = document.querySelector("#sliderLeft");
  let slider = document.querySelector("#slider");
  let sliderRight = document.querySelector("#sliderRight");
  let sliderWidth = parseInt(getComputedStyle(slider).width);
  let sliderItemCounter = slider.children.length

  let moveSlider = (direction) => {

    direction.addEventListener("click", (e) => {
      e.preventDefault();
      let sliderPosition = parseInt(getComputedStyle(slider).right);

      if (sliderPosition < (sliderItemCounter - 1) * sliderWidth && direction == sliderRight) {
        slider.style.right = sliderPosition + sliderWidth + "px";
      }

      if (sliderPosition == (sliderItemCounter - 1) * sliderWidth && direction == sliderRight) {
        slider.style.right = 0 + "px";
      }

      if (sliderPosition > 0 && direction == sliderLeft) {
        slider.style.right = sliderPosition - sliderWidth + "px";
      }

      if (sliderPosition == 0 && direction == sliderLeft) {
        slider.style.right = (sliderItemCounter - 1) * sliderWidth + "px";
      }

      window.addEventListener("resize", () => {
        sliderPosition = 0;
        slider.style.right = sliderPosition;
        sliderWidth = parseInt(getComputedStyle(slider).width);
      });
    });
  };

  let addListeners = () => {
    moveSlider(sliderRight);
    moveSlider(sliderLeft);
  };

  return { init: addListeners };
})();

applySlider.init();

/// слайдер вариант 3 за счет изменения style.right

// let sliderLeft = document.querySelector("#sliderLeft");
// let slider = document.querySelector("#slider");
// let sliderRight = document.querySelector("#sliderRight");
// let sliderWidth = parseInt(getComputedStyle(slider).width);
// let sliderItemCounter = slider.children.length;

// let moveSliderRight = (e) => {
//   e.preventDefault();
//   let sliderPosition = parseInt(getComputedStyle(slider).right);


//   if (sliderPosition < (sliderItemCounter - 1) * sliderWidth) {
//     slider.style.right = sliderPosition + sliderWidth + "px";
//   }

//   if (sliderPosition == (sliderItemCounter - 1) * sliderWidth) {
//     slider.style.right = 0 + "px";
//   }
// };

// let moveSliderLeft = (e) => {
//   e.preventDefault();
//   let sliderPosition = parseInt(getComputedStyle(slider).right);

//   if (sliderPosition > 0) {
//     slider.style.right = sliderPosition - sliderWidth + "px";
//   }

//   if (sliderPosition == 0) {
//     slider.style.right = (sliderItemCounter - 1) * sliderWidth + "px";
//   }
// };

// window.addEventListener("resize", () => {
//   let sliderPosition = 0;
//   slider.style.right = sliderPosition;
//   sliderWidth = parseInt(getComputedStyle(slider).width);
// });

// sliderLeft.addEventListener("click", (e) => { moveSliderLeft(e) });

// sliderRight.addEventListener("click", (e) => { moveSliderRight(e) });


/// формирование запроса на сервер

let sendAjax = (form) => {
  let formAjax = new FormData();
  formAjax.append("name", form.elements.name.value);
  formAjax.append("phone", form.elements.phone.value);
  formAjax.append("comments", form.elements.comments.value);
  formAjax.append("to", "test@test.com");

  let url = "https://webdev-api.loftschool.com/sendmail";
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open("POST", url);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send(formData);

  return xhr;
};

/// обработка ответа сервера

let submitForm = (e) => {
  e.preventDefault();
  let form = e.target;
  if (!form.elements.name.value && !form.elements.phone.value && !form.elements.comments.value) {
    let request = sendAjax(form);
    request.addEventListener("load", (e) => {
      if (request.status >= 400) {
        let contentModalForm = "Ошибка соединения с сервером, попробуйте позже";
        overlay.open("#modal-form", `${contentModalForm}. Ошибка ${request.status}`)
      } else {
        contentModalForm = request.response.message;
        overlay.open("#modal-form", contentModalForm)
      }
    })
  } else overlay.open("#modal-form", "заполните все поля")
};

let orderForm = document.querySelector("#form");
orderForm.addEventListener("submit", submitForm);