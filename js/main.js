/// модальное окно в адаптиве, бургер меню

let onBurgerMenu = (() => {

  let icon = document.querySelector("#hamburger-menu-icon");
  let menu = document.querySelector("#hamburger-menu");
  let logoBurger = menu.querySelector(".logo");
  let itemList = menu.querySelector(".nav__list").children;

  // console.log(itemList);

  // let counter = 0;

  // let slideInUp = (arg) => {
  //   arg.classList.toggle("slideInUp");
  //   console.log(arg);
  // };

  // let startMenuAnimation = () => {
  //   for (let i = 0; i < itemList.length; i++) {

  //     setTimeout(slideInUp, 1000, itemList[i])

  //     // itemList[i].classList.toggle("slideInUp");
  //     // setTimeout(startMenuAnimation, 1000);
  //     // console.log(i);
  //   }
  // };

  let counter = 0;

  let startMenu = () => {
    let element = itemList[counter];

    element.classList.toggle('slideInUp');
    counter++;
    if (counter < itemList.length) {
      setTimeout(startMenu, 50);
      console.log(counter)
    }
    if (counter === itemList.length) {
      counter = 0;
    }
  }

  let startMenuAnima = () => {
    startMenu();
  }

  // let startMenuAnimation = function startMenu() {
  //   let element = itemList[counter];

  //   element.classList.toggle('slideInUp');
  //   counter++;
  //   if (counter < itemList.length) {
  //     setTimeout(startMenu, 100);
  //     console.log(counter)
  //   }
  //   if (counter === itemList.length) {
  //     counter = 0;
  //   }
  // }

  let toggleMenu = (e) => {
    e.preventDefault();
    icon.classList.toggle("hamburger-menu-icon--active");
    menu.classList.toggle("hamburger-menu--active");
    document.querySelector("body").classList.toggle("locked");
    startMenuAnima();
  };

  let listeners = () => {
    icon.addEventListener("click", toggleMenu);
    logoBurger.addEventListener("click", toggleMenu);
    menu.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav__link")) {
        toggleMenu(e);
      };
    });
  }

  return {
    open: listeners,
  };
})();

onBurgerMenu.open()

/// модальное окно только для отзвов "modal-review" 

// let modalReviews = document.querySelector("#modal-review");
// //let btnReviews = document.querySelectorAll("#btn--reviews");
// let modalForm = document.querySelector("#modal-form");
// let reviewsList = document.querySelector(".reviews-list");
// let contentReview = document.querySelector('#reviewOverlay').innerHTML;

// let closeModalOverlay = (e) => {
//   e.preventDefault();
//   modalReviews.classList.remove("modal--active");
//   document.querySelector("body").classList.remove("locked");
// };

// let openModalReview = (e) => {
//   e.preventDefault();
//   if (e.target.classList.contains("btn--reviews")) {
//     modalReviews.classList.add("modal--active");
//     document.querySelector("body").classList.add("locked");
//     document.querySelector(".modal__inner--review").innerHTML = contentReview;

//     let closeModalBtn = document.createElement("a");
//     closeModalBtn.classList.add("modal-review__close");
//     closeModalBtn.setAttribute("href", "#")
//     document.querySelector(".modal__inner--review").appendChild(closeModalBtn);
//     closeModalBtn.addEventListener("click", closeModalOverlay);
//     modalReviews.addEventListener("click", (e) => {
//       if (e.target == modalReviews) { closeModalOverlay(e) };
//     });

//   };
// };

// reviewsList.addEventListener("click", openModalReview);

// btnReviews.forEach((item) => {
//   item.addEventListener("click", openModalReview)
// })


/// модальное окно, общая функция

let overlay = (() => {

  let closeModalBtn = document.createElement("a");
  closeModalBtn.classList.add("modal-review__close");
  closeModalBtn.setAttribute("href", "#");

  let closeMsgBtn = document.createElement("button");
  closeMsgBtn.classList.add("btn", "btn--modal");
  closeMsgBtn.setAttribute("type", "button");


  let closeOverlay = (modalID) => {
    let modalTarget = document.querySelector(modalID);

    modalTarget.classList.remove("modal--active");
    document.querySelector("body").classList.remove("locked");
  };

  let openOverlay = (modalID, content) => {

    let modalTarget = document.querySelector(modalID);
    let innerModalTarget = modalTarget.querySelector('.modal__inner');

    modalTarget.classList.add("modal--active");
    document.querySelector("body").classList.add("locked");

    if (content) {
      innerModalTarget.innerHTML = content;
    };

    if (modalID === "#modal-review") {
      innerModalTarget.appendChild(closeModalBtn);
      closeModalBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeOverlay(modalID)
      }
      );
    };

    if (modalID === '#modal-form') {
      innerModalTarget.appendChild(closeMsgBtn);
      closeMsgBtn.textContent = 'закрыть';
      closeMsgBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeOverlay(modalID)
      });
    };

    modalTarget.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target == modalTarget) { closeOverlay(modalID) };
    });

  };

  return {
    open: openOverlay,
    close: closeOverlay,
  }
})();

let openReview = (template) => {
  let reviewList = document.querySelector(".reviews-list");
  reviewList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("btn--reviews")) {
      console.log("yes");
      overlay.open("#modal-review", template);
    }
  });
};

let contentReview = document.querySelector("#reviewOverlay").innerHTML;
openReview(contentReview);

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

        let currentMemberReview = currentMember.querySelector(".member__review");
        currentMemberReview.style.height = currentMemberReview.scrollHeight + 'px';
      }
    })
  })
}

verticalAccordeon();

/// горизонтальный аккордеон Jquery

// $(document).ready(function () {
//   $(".menu__accordeon-item").on("click", function (e) {
//     e.preventDefault();
//     console.log(e.target);
//     let activeLink = $(".submenu--active");
//     //console.log(activeLink[0]);
//     if (activeLink.length > 0 && e.target !== activeLink.find(".submenu__block")[0]) {
//       activeLink.removeClass("submenu--active");
//       activeLink.find(".submenu__block").css("width", "0px");
//       console.log("child", activeLink.find(".submenu__block")[0]);
//       // console.log();
//     };
//     if (activeLink.length === 0 || e.currentTarget !== activeLink[0]) {
//       //console.log("you are here");
//       $(e.currentTarget).addClass("submenu--active");
//       $(e.currentTarget).find(".submenu__block").css("width", "550px")
//     };
//   })
// })

/// горизонтальный аккордеон Jquery через submenu__link

$(document).ready(function () {
  let windowWidth = $(window).width();
  let mobileWidth = $(window).width() - $(".submenu").length * $(".submenu").width() + "px";
  
  $(".submenu__link").on("click", function (e) {
    console.log(mobileWidth);
    e.preventDefault();
    let activeLink = $(".submenu--active");
    console.log(activeLink.find(".submenu__link")[0]);
    //console.log(activeLink[0]);
    if (activeLink.length > 0) {
      activeLink.find(".submenu__block").css("width", "0px");
      activeLink.removeClass("submenu--active");
      // console.log("child", activeLink.find(".submenu__block")[0]);
      // console.log();
    };
    if (activeLink.length === 0 || e.currentTarget !== activeLink.find(".submenu__link")[0]) {
      //console.log("you are here");
      $(e.currentTarget).closest(".submenu").addClass("submenu--active");
      if (windowWidth > 480) {
        $(e.currentTarget).next(".submenu__block").css("width", "550px")
      } 
      else {
        // let mobileWidth = $(window).width() - $(".submenu").length * $(".submenu").width() + "px";
        $(e.currentTarget).next(".submenu__block").css("width", mobileWidth)
      }
    };
  })
  
})

// let startToWork = function (item) {
//   item.on("click", function (e) {
//     e.preventDefault();
//     console.log(e.currentTarget);
//     let activeLink = $(".submenu--active");
//     console.log(activeLink);
//     if (activeLink.length > 0) {
//       activeLink.removeClass("submenu--active");
//       console.log($(".menu__accordeon-item").hasClass("submenu--active"));
//     };
//     if (activeLink.length === 0 || e.currentTarget !== activeLink) {
//       console.log("you are here");
//       $(e.currentTarget).addClass("submenu--active");
//     };
//   })
// };

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

/// ИСПОЛЬЗУЙ ЕГО ЕСЛИ НЕ JQ слайдер вариант 2 за счет изменения style.right c iief

// let applySlider = (() => {
//   let sliderLeft = document.querySelector("#sliderLeft");
//   let slider = document.querySelector("#slider");
//   let sliderRight = document.querySelector("#sliderRight");
//   let sliderWidth = parseInt(getComputedStyle(slider).width);
//   let sliderItemCounter = slider.children.length

//   let moveSlider = (direction) => {

//     direction.addEventListener("click", (e) => {
//       e.preventDefault();
//       let sliderPosition = parseInt(getComputedStyle(slider).right);

//       if (sliderPosition < (sliderItemCounter - 1) * sliderWidth && direction == sliderRight) {
//         slider.style.right = sliderPosition + sliderWidth + "px";
//       }

//       if (sliderPosition == (sliderItemCounter - 1) * sliderWidth && direction == sliderRight) {
//         slider.style.right = 0 + "px";
//       }

//       if (sliderPosition > 0 && direction == sliderLeft) {
//         slider.style.right = sliderPosition - sliderWidth + "px";
//       }

//       if (sliderPosition == 0 && direction == sliderLeft) {
//         slider.style.right = (sliderItemCounter - 1) * sliderWidth + "px";
//       }

//       window.addEventListener("resize", () => {
//         sliderPosition = 0;
//         slider.style.right = sliderPosition;
//         sliderWidth = parseInt(getComputedStyle(slider).width);
//       });
//     });
//   };

//   let addListeners = () => {
//     moveSlider(sliderRight);
//     moveSlider(sliderLeft);
//   };

//   return { init: addListeners };
// })();

// applySlider.init();

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
  formAjax.append("comment", form.elements.comments.value);
  formAjax.append("to", "test@test.com");

  let url = "https://webdev-api.loftschool.com/sendmail";
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open("POST", url);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send(formAjax);

  return xhr;
};

/// обработка ответа сервера

let submitForm = (e) => {
  e.preventDefault();
  let form = e.target;
  console.log(e.target);
  if (form.elements.name.value && form.elements.phone.value && form.elements.comments.value) {
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