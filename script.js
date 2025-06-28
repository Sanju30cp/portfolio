// DOM Elements
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contactForm");

// Initialize Theme (Dark by default)
document.addEventListener("DOMContentLoaded", function () {
  // Set dark theme by default
  body.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
  themeToggle.textContent = "☀️";

  // Initialize particles with dark theme colors
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  }

  // Initialize skill bars
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width + "%";
  });

  // Add scroll to top button
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollToTopBtn);

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Initialize animations
  addClickAnimation();
  animateOnScroll();
});

// Theme Toggle Functionality
themeToggle.addEventListener("click", () => {
  const newTheme =
    body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeToggle(newTheme);

  // Update particles color based on theme
  if (
    typeof particlesJS !== "undefined" &&
    window.pJSDom &&
    window.pJSDom.length > 0
  ) {
    const newColor = newTheme === "dark" ? "#ffffff" : "#3a86ff";
    window.pJSDom[0].pJS.particles.color.value = newColor;
    window.pJSDom[0].pJS.particles.line_linked.color = newColor;
    window.pJSDom[0].pJS.fn.particlesRefresh();
  }
});

function updateThemeToggle(theme) {
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Mobile Menu Toggle
mobileToggle.addEventListener("click", () => {
  mobileToggle.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background =
      body.getAttribute("data-theme") === "dark"
        ? "rgba(30, 30, 30, 0.98)"
        : "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.background =
      body.getAttribute("data-theme") === "dark"
        ? "rgba(30, 30, 30, 0.95)"
        : "rgba(255, 255, 255, 0.95)";
  }

  // Show/hide scroll to top button
  const scrollToTopBtn = document.querySelector(".scroll-to-top");
  if (window.scrollY > 500) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }

  // Update active nav link
  updateActiveNavLink();
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const scrollPosition = window.scrollY;

  document.querySelectorAll("section[id]").forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Contact form submission
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    console.log("Form submitted:", data);

    // Show success message
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
  });
}

// Click Animation Functions
function addClickAnimation() {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.classList.add("btn-click-effect");

    button.removeEventListener("click", createRipple);
    button.addEventListener("click", createRipple);
  });

  // Add pulse animation to primary buttons
  document.querySelectorAll(".btn-primary").forEach((button) => {
    button.classList.add("btn-pulse");
  });

  // Add card click effect
  document
    .querySelectorAll(
      ".education-card, .project-card, .achievement-card, .contact-card"
    )
    .forEach((card) => {
      card.classList.add("card-click-effect");
      card.style.cursor = "pointer";

      card.addEventListener("click", function (e) {
        if (!e.target.closest("a")) {
          this.style.transform = "scale(0.98)";
          setTimeout(() => {
            this.style.transform = "scale(1)";
          }, 200);
        }
      });
    });
}

function createRipple(e) {
  const button = e.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${
    e.clientX - button.getBoundingClientRect().left - radius
  }px`;
  circle.style.top = `${
    e.clientY - button.getBoundingClientRect().top - radius
  }px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

// Intersection Observer for section animations
function animateOnScroll() {
  const sections = document.querySelectorAll("section");
  const educationItems = document.querySelectorAll(".education-item");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // If it's the education section, animate each item with a delay
        if (entry.target.classList.contains("education")) {
          educationItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("visible");
            }, index * 200);
          });
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
}