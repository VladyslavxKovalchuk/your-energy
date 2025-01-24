export function handleNavClick() {
  const navSelector = document.querySelector(".js-header-nav-list");
  const logoElement = document.querySelector(".logo");
  const mobileMenuButton = document.querySelector(".menu-btn");
  const closeMobileMenuButton = document.querySelector(".close-btn-menu");
  const menuEl = document.querySelector(".mobile-menu-backdrop");
  const anchorCloseMenuItems = document.querySelectorAll('.menu-item');

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      menuEl.classList.add("is-open");
    });
  }

  if (closeMobileMenuButton) {
    closeMobileMenuButton.addEventListener("click", () => {
      menuEl.classList.remove("is-open");
    });
  }

  if (anchorCloseMenuItems) {
    anchorCloseMenuItems.forEach(anchorItem => {
      anchorItem.addEventListener("click", () => {
        menuEl.classList.remove("is-open");
      });
    });
  }

  const savedPath = localStorage.getItem("activePath");
  const currentPath = window.location.pathname;

  navSelector.querySelectorAll(".nav-link").forEach(navLink => {
    const navItem = navLink.closest(".nav-item");

    if (
      navLink.getAttribute("href") === savedPath ||
      navLink.getAttribute("href") === currentPath ||
      (currentPath === "/" && navLink.getAttribute("href") === "./index.html")
    ) {
      navLink.classList.add("js-nav-link-active");
      navItem.classList.add("js-nav-item-active");
    } else {
      navLink.classList.remove("js-nav-link-active");
      navItem.classList.remove("js-nav-item-active");
    }
  });

  navSelector.addEventListener("click", event => {
    const navLink = event.target.closest(".nav-link");

    if (!navLink) {
      return;
    }

    const navItem = navLink.closest(".nav-item");

    navSelector.querySelectorAll(".js-nav-link-active").forEach(link => {
      link.classList.remove("js-nav-link-active");
    });
    navSelector.querySelectorAll(".js-nav-item-active").forEach(item => {
      item.classList.remove("js-nav-item-active");
    });

    navLink.classList.add("js-nav-link-active");
    navItem.classList.add("js-nav-item-active");

    localStorage.setItem("activePath", navLink.getAttribute("href"));
  });

  logoElement.addEventListener("click", () => {
    navSelector.querySelectorAll(".js-nav-link-active").forEach(link => {
      link.classList.remove("js-nav-link-active");
    });
    navSelector.querySelectorAll(".js-nav-item-active").forEach(item => {
      item.classList.remove("js-nav-item-active");
    });

    const homeLink = navSelector.querySelector('.nav-link[href="./index.html"]');
    const homeItem = homeLink?.closest(".nav-item");

    if (homeLink && homeItem) {
      homeLink.classList.add("js-nav-link-active");
      homeItem.classList.add("js-nav-item-active");
    }

    localStorage.setItem("activePath", "./index.html");
  });
}

handleNavClick();
