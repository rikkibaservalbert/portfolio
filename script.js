/* Rikki Valbert Baser Portfolio JavaScript */

(() => {
  "use strict";

  function initPortfolio() {
    // Auto-typing hero title
    const typedText = document.getElementById("typed-text");
    const roles = [
      "Graphic Designer",
      "IT Support Specialist",
      "Content & Social Media Manager"
    ];

    if (typedText) {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      function typeRole() {
        const role = roles[roleIndex];
        typedText.textContent = role.slice(0, charIndex);

        if (!deleting) {
          if (charIndex < role.length) {
            charIndex += 1;
            window.setTimeout(typeRole, 65);
          } else {
            deleting = true;
            window.setTimeout(typeRole, 1400);
          }
        } else if (charIndex > 0) {
          charIndex -= 1;
          window.setTimeout(typeRole, 32);
        } else {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          window.setTimeout(typeRole, 250);
        }
      }

      typeRole();
    }

    // Mobile navigation
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
      });

      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Scroll reveal; make content visible if IntersectionObserver isn't supported.
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

      revealElements.forEach((element) => revealObserver.observe(element));
    } else {
      revealElements.forEach((element) => element.classList.add("visible"));
    }

    // Gentle hover tilt on cards and gallery images.
    const canHover = window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (canHover) {
      document.querySelectorAll(".tilt-card").forEach((card) => {
        card.addEventListener("pointermove", (event) => {
          const rect = card.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          const rotateY = (x - 0.5) * 6;
          const rotateX = (0.5 - y) * 6;
          card.style.setProperty("--tilt-transform", `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`);
          card.style.transform = card.style.getPropertyValue("--tilt-transform");
        });
        card.addEventListener("pointerleave", () => {
          card.style.removeProperty("--tilt-transform");
          card.style.transform = "";
        });
      });
    }

    // Dynamic footer year
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPortfolio, { once: true });
  } else {
    initPortfolio();
  }

  // Theme toggle: dark by default, remember the user's explicit selection.
  const themeToggle = document.getElementById("theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    const isLight = theme === "light";
    document.body.classList.toggle("light-mode", isLight);
    if (themeMeta) themeMeta.setAttribute("content", isLight ? "#f8fafc" : "#090a0e");
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
      themeToggle.setAttribute("title", isLight ? "Switch to dark mode" : "Switch to light mode");
    }
  }

  if (themeToggle) {
    let savedTheme = null;
    try { savedTheme = localStorage.getItem("theme"); } catch (_) {}
    // Respect a saved choice; otherwise begin in dark mode.
    applyTheme(savedTheme === "light" ? "light" : "dark");

    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
      applyTheme(nextTheme);
      try { localStorage.setItem("theme", nextTheme); } catch (_) {}
    });
  }
})();


/* =====================================
   PORTFOLIO INTRO LOADER
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("introLoader");
  const introRoles = document.querySelectorAll(".intro-role");

  if (!loader) return;

  let activeRole = 0;
  let finished = false;

  const startTime = Date.now();
  const minimumDuration = 2800;

  const roleTimer = introRoles.length > 1
    ? setInterval(() => {
        if (finished) return;

        introRoles[activeRole].classList.remove("active");

        activeRole = (activeRole + 1) % introRoles.length;

        introRoles[activeRole].classList.add("active");
      }, 750)
    : null;

  function hideIntro() {
    if (finished) return;

    finished = true;

    if (roleTimer) {
      clearInterval(roleTimer);
    }

    loader.classList.add("is-hidden");

    setTimeout(() => {
      loader.style.display = "none";
    }, 900);
  }

  function finishWhenReady() {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minimumDuration - elapsed);

    setTimeout(hideIntro, remaining);
  }

  if (document.readyState === "complete") {
    finishWhenReady();
  } else {
    window.addEventListener("load", finishWhenReady, {
      once: true
    });
  }

  // Fallback so the intro cannot remain stuck indefinitely.
  setTimeout(hideIntro, 10000);
});