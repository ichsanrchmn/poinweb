document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector("#header");
  if (selectHeader) {
    document.addEventListener("scroll", () => {
      window.scrollY > 100
        ? selectHeader.classList.add("sticked")
        : selectHeader.classList.remove("sticked");
    });
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll("#navbar .scrollto");

  function navbarlinksActive() {
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY;
      if (navbarlink.hash != "#header") position += 200;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navbarlinksActive);
  document.addEventListener("scroll", navbarlinksActive);

  /**
   * Function to scroll to an element with top ofset
   */
  function scrollto(el) {
    const selectHeader = document.querySelector("#header");
    let offset = 0;

    if (selectHeader.classList.contains("sticked")) {
      offset = document.querySelector("#header.sticked").offsetHeight;
    } else if (selectHeader.hasAttribute("data-scrollto-offset")) {
      offset =
        selectHeader.offsetHeight -
        parseInt(selectHeader.getAttribute("data-scrollto-offset"));
    }
    window.scrollTo({
      top: document.querySelector(el).offsetTop - offset,
      behavior: "smooth",
    });
    history.replaceState(null, null, window.location.pathname);
  }

  /**
   * Fires the scrollto function on click to links .scrollto
   */
  let selectScrollto = document.querySelectorAll(".scrollto");
  selectScrollto.forEach((el) =>
    el.addEventListener("click", function (event) {
      if (document.querySelector(this.hash)) {
        event.preventDefault();

        let mobileNavActive = document.querySelector(".mobile-nav-active");
        if (mobileNavActive) {
          mobileNavActive.classList.remove("mobile-nav-active");

          let navbarToggle = document.querySelector(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    })
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    const toggleScrollTop = () => {
      window.scrollY > 100
        ? scrollTop.classList.remove("hidden")
        : scrollTop.classList.add("hidden");
    };
    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);
    scrollTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavToogle = document.querySelector(".mobile-nav-toggle");
  if (mobileNavToogle) {
    mobileNavToogle.addEventListener("click", function (event) {
      event.preventDefault();

      document.querySelector("body").classList.toggle("mobile-nav-active");

      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });
  }
});

const carousel = document.querySelector(".carousel");
firstImg = document.querySelectorAll(".carousel-img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 26;
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

const autoSlide = () => {
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;

  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 26;
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  // updating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  // scrolling images to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);

carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
