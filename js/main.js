////////////////// модальное окно в адаптиве, бургер меню //////////////////


let onBurgerMenu = (() => {


  let icon = document.querySelector("#hamburger-menu-icon");
  let menu = document.querySelector("#hamburger-menu");
  let logoBurger = menu.querySelector(".logo");
  let itemList = menu.querySelector(".nav__list").children;

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

onBurgerMenu.open();


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

;

////////////////// модальное окно, общая функция //////////////////

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

////////////////// вертикальный аккордеон  //////////////////

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

////////////////// горизонтальный аккордеон Jquery через submenu__link //////////////////

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

////////////////// слайдер вариант 1 //////////////////

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

////////////////// ИСПОЛЬЗУЙ ЕГО ЕСЛИ НЕ JQ слайдер вариант 2 за счет изменения style.right c iief //////////////////

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

////////////////// слайдер вариант 3 за счет изменения style.right //////////////////

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


////////////////// формирование запроса на сервер //////////////////

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

////////////////// обработка ответа сервера //////////////////

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

////////////////// one page scroll //////////////////

let onePageScroll = (function () {
  let detect = new MobileDetect(window.navigator.userAgent)
  let isMobile = detect.mobile();

  let sections = $(".section");
  let contentView = $("#content");
  let isAction = false;

  let performTransition = function (sectionIndex) {
    if (!isAction) {
      isAction = true;
      let scrollHeight = sectionIndex * (-100) + "%";

      sections.eq(sectionIndex).addClass("is-active").siblings().removeClass("is-active");
      contentView.css({
        transform: `translateY(${scrollHeight})`,
      });

      $(".points-item").eq(sectionIndex).addClass("points-item--active").siblings().removeClass("points-item--active");

      setTimeout(function () {
        isAction = false;
      }, 350)
    }
  };

  $("[data-to-scroll]").on("click", function (e) {
    e.preventDefault;
    performTransition($(e.target).data("to-scroll"));
  })

  let defineSections = function () {
    let activeSection = sections.filter(".is-active");
    return {
      activeSection: activeSection,
      nextSection: activeSection.next(),
      prevSection: activeSection.prev(),
    }
  };

  let scrollToSection = function (direction) {

    let sectionsList = defineSections();

    if (direction === "up" && sectionsList.nextSection.length > 0) {
      performTransition(sectionsList.nextSection.index())
    }
    if (direction === "down" && sectionsList.prevSection.length > 0) {
      performTransition(sectionsList.prevSection.index())
    };

  };

  $(".wrapper").on({
    wheel: function (e) {
      let deltaY = e.originalEvent.deltaY;
      let direction = deltaY > 0 ? "up" : "down";
      scrollToSection(direction);
    },
    touchmove: function (e) {
      e.preventDefault();
    }
  })

  if (isMobile) {
    $(window).swipe({
      swipe: function (event, direction) {
        scrollToSection(direction);
      }
    });
  }

  $(document).on('keydown', function (e) {
    let section = defineSections(sections);
    switch (e.keyCode) {
      case 40:
        if (section.nextSection.length) {
          performTransition(section.nextSection.index());
        }
        break;
      case 38:
        if (section.prevSection.length) {
          performTransition(section.prevSection.index());
        }
        break;
    }
  });
})();

////////////////// burgerStructure, dropdown //////////////////

$(".burgers__structure").on({
  mouseenter: function (e) {
    $(e.currentTarget).addClass("burgers__structure--active")
  },
  mouseleave: function (e) {
    $(e.currentTarget).removeClass("burgers__structure--active")
  },
})

let abc;

$(".structure__cross").on({
  click: function (e) {
    abc = e.currentTarget;
    console.log(e.currentTarget);
    e.preventDefault;
    $(e.currentTarget).closest(".burgers__structure").removeClass("burgers__structure--active")
  }
})

//////////////////  Видео Плеер  //////////////////

let video;
let durationControl;
let soundControl;
let intervalId;

  // документ полностью загружен
$().ready(function () {

  video = document.getElementById("player");

  // вешаем обработчик события onclick на тег video
  video.addEventListener('click', playStop);

  // обработчики событий для кнопок play
  let playButtons = document.querySelectorAll(".play");
  for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', playStop);
  }

  // обработчик событий для кнопки динамик
  let micControl = document.getElementById("volume__mute");
  micControl.addEventListener('click', soundOf)

  // обработчики событий для ползунка продолжительности видео
  durationControl = document.getElementById("durationLevel");
  durationControl.addEventListener('mousedown', stopInterval);
  // durationControl.addEventListener('click',setVideoDuration);
  durationControl.addEventListener('mouseup', setVideoDuration);

  durationControl.min = 0;
  durationControl.value = 0;

  // обработчики событий для ползунка громокости
  soundControl = document.getElementById("soundLevel");
  // soundControl.addEventListener('click', changeSoundVolume);
  soundControl.addEventListener('mouseup', changeSoundVolume);

  // задаем максимальные и минимальные значения громокости
  soundControl.min = 0;
  soundControl.max = 10;
  // присваиваем ползунку максимальное значение
  soundControl.value = soundControl.max;

  //обрабатываем окончание видео
  video.addEventListener('ended', function () {
    $(".video-player__play").toggleClass("video-player__play--active");
    video.currentTime = 0;
  }, false);
});
/*
 Воспроизведение видео
*/
function playStop() {
  // показывает или скрывает белую кнопку play
  $(".video-player__play").toggleClass("video-player__play--active");
  // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
  durationControl.max = video.duration;

  // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрывается, то остановим.
  if (video.paused) {
    // video.webkitRequestFullScreen(); //возможность открыть в полноэкранном режиме
    // запускаем видео
    video.play();
    intervalId = setInterval(updateDuration, 1000 / 66)

  } else {
    // video.webkitExitFullscreen(); //выйти из полноэкранного режима
    // останавливаем видео
    video.pause();
    clearInterval(intervalId);

  }
}

function stopInterval() {
  video.pause();
  clearInterval(intervalId);
}
/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  video.currentTime = durationControl.value;
  intervalId = setInterval(updateDuration, 1000 / 66);
}
/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration() {
  durationControl.value = video.currentTime;
  // console.log(video.currentTime)
}
/*
    Управление звуком
*/
function soundOf() {
  /*
      Делаем проверку уровня громкости. 
      Если у нас нашего видео есть звук, то мы его выключаем. 
      Предварительно запомнив текущую позицию громкости в переменную soundLevel
  */
  if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * 10;
  } else {
    /*
        Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
        Хранится в перменной soundLevel
    */
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
  }
}
/*
    Управление звуком видео
*/
function changeSoundVolume() {
  /*
      Св-во volume может принимать значения от 0 до 1
      Делим на 10 для того что бы, была возможность более точной регулировки видео. 
       video.volume 0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9  1 
 soundControl.value 0   1   2   3   4   5   6   7   8   9  10
      */

  video.volume = soundControl.value / 10;
  // console.log(video.volume)
}

////////////////// yandex map вариант раз //////////////////

// ymaps.ready(init);
// function init() {
//   let myMap = new ymaps.Map('map', {
//     center: [51.662588, 39.202302],
//     zoom: 16,
//     controls: ['zoomControl'],
//     behaviors: ['drag']
//   });

//   let pointsGeo = [[51.660848, 39.202281], [51.664741, 39.205147], [51.666020, 39.203111]];

//   let markerDesc = {
//     hintContent: 'твои бургеры здесь',
//     balloonContent: 'Ничего себе, вот это да !'
//   };

//   let markerPreSet = {
//     iconLayout: 'default#image',
//     iconImageHref: './img/svg/map-marker.svg',
//     iconImageSize: [46, 58],
//     iconImageOffset: [-26, -58],
//   };

//   for (let i = 0; i < pointsGeo.length; i++) {
//     let myPlacemark = [];
//     myPlacemark[i] = new ymaps.Placemark(pointsGeo[i], markerDesc, markerPreSet);
//     myMap.geoObjects.add(myPlacemark[i])
//   };

//   myMap.geoObjects.add(new ymaps.Placemark(pointsGeo[0], markerDesc, markerPreSet))

// }


////////////////// yandex map вариант два //////////////////


ymaps.ready(init);

let placemarks = [
  {
    latitude: 51.660848, 
    longitude: 39.202281,
    hintContent: 'Mr. Burger №1',
    balloonContent: 'Лучшие бургеры в городе!',
  },
  {
    latitude: 51.664741, 
    longitude: 39.20514,
    hintContent: 'Mr. Burger №2',
    balloonContent: 'Лучшие бургеры в городе!',
  },
  {
    latitude: 51.666020, 
    longitude: 39.203111,
    hintContent: 'Mr. Burger №3',
    balloonContent: 'Лучшие бургеры в городе!',
  },
  {
    latitude: 51.664280, 
    longitude: 39.1979481,
    hintContent: 'Mr. Burger №4',
    balloonContent: 'Лучшие бургеры в городе!',
  },
],
  geoObjects = [];

function init() {
  let myMap = new ymaps.Map('map', {
    center: [51.662588, 39.202302],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });
  for (let i = 0; i < placemarks.length; i++) {
    geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
      hintContent: placemarks[i].hintContent,
      balloonContent: placemarks[i].balloonContent
    },
      {
        iconLayout: 'default#image',
        iconImageHref: './img/svg/map-marker.svg',
        iconImageSize: [46, 58],
        iconImageOffset: [-23, -58]
      });
  };

  let clusterer = new ymaps.Clusterer({
    clusterIcons: [
      {
        href: './img/svg/logo.svg',
        size: [98, 74],
        offset: [0, 0]
      }
    ],
    clusterIconContentLayout: null
  });

  clusterer.add(geoObjects)
  myMap.geoObjects.add(clusterer);
}



