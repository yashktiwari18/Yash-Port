"use strict";

const toggleClass = (element, className = "active") => {
  if (element) element.classList.toggle(className);
};

document.addEventListener("DOMContentLoaded", () => {
  const dynamicText = document.querySelector(".dynamic-text");
  const titles = ["Web Developer", "Freelancer", "AI Expert", "UI/UX Designer"];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!dynamicText) return;

    const currentTitle = titles[titleIndex];
    const visibleText = currentTitle.substring(0, charIndex);
    dynamicText.textContent = `${visibleText}|`;

    if (isDeleting) {
      charIndex -= 1;
    } else {
      charIndex += 1;
    }

    let typeSpeed = isDeleting ? 55 : 115;

    if (!isDeleting && charIndex > currentTitle.length) {
      typeSpeed = 1400;
      isDeleting = true;
    }

    if (isDeleting && charIndex < 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      charIndex = 0;
      typeSpeed = 350;
    }

    window.setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  const header = document.querySelector("[data-header]");
  const goTopBtn = document.querySelector("[data-go-top]");

  function handleScrollState() {
    const isScrolled = window.scrollY >= 10;
    header?.classList.toggle("active", isScrolled);
    goTopBtn?.classList.toggle("active", isScrolled);
  }

  handleScrollState();
  window.addEventListener("scroll", handleScrollState, { passive: true });

  const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const navbarLinks = document.querySelectorAll(".navbar-link");

  function closeMobileMenu() {
    navToggleBtn?.classList.remove("active");
    navbar?.classList.remove("active");
    document.body.classList.remove("active");
    navToggleBtn?.setAttribute("aria-expanded", "false");
  }

  navToggleBtn?.addEventListener("click", () => {
    toggleClass(navToggleBtn);
    toggleClass(navbar);
    toggleClass(document.body);
    const expanded = navToggleBtn.classList.contains("active");
    navToggleBtn.setAttribute("aria-expanded", String(expanded));
  });

  navbarLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  const themeToggleBtn = document.querySelector("[data-theme-btn]");

  function applyTheme(theme) {
    document.body.classList.toggle("dark_theme", theme === "dark_theme");
    document.body.classList.toggle("light_theme", theme !== "dark_theme");
    themeToggleBtn?.classList.toggle("active", theme === "dark_theme");
    themeToggleBtn?.setAttribute("aria-pressed", String(theme === "dark_theme"));
  }

  const savedTheme = localStorage.getItem("theme") || "light_theme";
  applyTheme(savedTheme);

  themeToggleBtn?.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark_theme") ? "light_theme" : "dark_theme";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });

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
      { threshold: 0.16 }
    );

    animatedEls.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;
      revealObserver.observe(element);
    });
  } else {
    animatedEls.forEach((element) => element.classList.add("is-visible"));
  }

  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const activeLink = document.querySelector(`.navbar-link[href="#${entry.target.id}"]`);
          navbarLinks.forEach((link) => link.classList.remove("active"));
          activeLink?.classList.add("active");
        });
      },
      {
        rootMargin: "-36% 0px -58% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => navObserver.observe(section));
  }

  const counters = document.querySelectorAll(".stat-value[data-target]");

  function animateCounter(counter) {
    const target = Number(counter.dataset.target || "0");
    const duration = 1200;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = String(Math.round(target * eased));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  if ("IntersectionObserver" in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.45 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach((counter) => {
      counter.textContent = counter.dataset.target || "0";
    });
  }

  const progressBars = document.querySelectorAll(".progress i[data-progress]");

  function fillProgress(bar) {
    bar.style.width = `${bar.dataset.progress || 0}%`;
  }

  if ("IntersectionObserver" in window && progressBars.length) {
    const progressObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fillProgress(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    progressBars.forEach((bar) => progressObserver.observe(bar));
  } else {
    progressBars.forEach(fillProgress);
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card[data-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const shouldShow = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  const contactForm = document.querySelector(".contact-form");
  const formStatus = document.querySelector(".form-status");

  function validateField(field) {
    const wrapper = field.closest(".form-wrapper");
    const isValid = field.checkValidity();
    wrapper?.classList.toggle("invalid", !isValid);
    return isValid;
  }

  contactForm?.querySelectorAll(".input-field").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest(".form-wrapper")?.classList.contains("invalid")) {
        validateField(field);
      }
    });
  });

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = Array.from(contactForm.querySelectorAll(".input-field"));
    const fieldStates = fields.map(validateField);
    const isFormValid = fieldStates.every(Boolean);

    if (!isFormValid) {
      formStatus.textContent = "Please fix the highlighted fields.";
      return;
    }

    formStatus.textContent = "Thanks. Your message is ready to send.";
    contactForm.reset();
  });
});
