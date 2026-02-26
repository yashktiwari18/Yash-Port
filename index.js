'use strict';

/**
 * element toggle function
 */
const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Dynamic Typing Effect
   */
  const dynamicText = document.querySelector(".dynamic-text");
  const titles = [
    "Web Developer ",
    "Freelancer ",
    "AI Expert ",
    "UI/UX Designer ",
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      dynamicText.textContent = currentTitle.substring(0, charIndex - 1) + "|";
      charIndex--;
    } else {
      dynamicText.textContent = currentTitle.substring(0, charIndex + 1) + "|";
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  /**
   * Header Sticky & Go to Top Button
   */
  const header = document.querySelector("[data-header]");
  const goTopBtn = document.querySelector("[data-go-top]");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 10) {
      header.classList.add("active");
      goTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      goTopBtn.classList.remove("active");
    }
  });

  /**
   * Navbar Toggle
   */
  const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const navbarLinks = document.querySelectorAll(".navbar-link");

  navToggleBtn.addEventListener("click", function () {
    elemToggleFunc(navToggleBtn);
    elemToggleFunc(navbar);
    elemToggleFunc(document.body);
  });

  // Close menu when a navbar link is clicked
  navbarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navbar.classList.contains("active")) {
        navToggleBtn.classList.remove("active");
        navbar.classList.remove("active");
        document.body.classList.remove("active");
      }
    });
  });

  /**
   * Skills Toggle
   */
  const toggleBtnBox = document.querySelector("[data-toggle-box]");
  const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
  const skillsBox = document.querySelector("[data-skills-box]");

  for (let i = 0; i < toggleBtns.length; i++) {
    toggleBtns[i].addEventListener("click", function () {
      elemToggleFunc(toggleBtnBox);
      for (let i = 0; i < toggleBtns.length; i++) {
        elemToggleFunc(toggleBtns[i]);
      }
      elemToggleFunc(skillsBox);
    });
  }

  /**
   * Dark & Light Theme Toggle
   */
  const themeToggleBtn = document.querySelector("[data-theme-btn]");

  themeToggleBtn.addEventListener("click", function () {
    elemToggleFunc(themeToggleBtn);

    if (themeToggleBtn.classList.contains("active")) {
      document.body.classList.remove("dark_theme");
      document.body.classList.add("light_theme");

      localStorage.setItem("theme", "light_theme");
    } else {
      document.body.classList.add("dark_theme");
      document.body.classList.remove("light_theme");

      localStorage.setItem("theme", "dark_theme");
    }
  });

  /**
   * Apply Last Selected Theme from Local Storage
   */
  if (localStorage.getItem("theme") === "light_theme") {
    themeToggleBtn.classList.add("active");
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");
  } else {
    themeToggleBtn.classList.remove("active");
    document.body.classList.remove("light_theme");
    document.body.classList.add("dark_theme");
  }

  /**
   * Scroll reveal animations
   */
  const animatedEls = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window && animatedEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    animatedEls.forEach((el, index) => {
      el.style.transitionDelay = `${index * 60}ms`;
      revealObserver.observe(el);
    });
  } else {
    animatedEls.forEach((el) => el.classList.add("is-visible"));
  }

  /**
   * Animated skill bars
   */
  const skillFills = document.querySelectorAll(".skill-bar-fill");

  if ("IntersectionObserver" in window && skillFills.length) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const percent = el.dataset.skillPercent;
            el.style.width = percent ? `${percent}%` : "0%";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );

    skillFills.forEach((el) => {
      el.style.width = "0%";
      skillsObserver.observe(el);
    });
  } else {
    skillFills.forEach((el) => {
      const percent = el.dataset.skillPercent;
      el.style.width = percent ? `${percent}%` : "0%";
    });
  }
});