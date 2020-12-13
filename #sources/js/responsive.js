const menuIcon = document.querySelector(".menu-header__icon");
const menu = document.querySelector(".menu-header__menu");
const links = document.querySelectorAll(".menu-header__link");

//smooth scroll from first fullscreen to content
const menuHeader = document.querySelector(".header");
const gotos = document.querySelectorAll(".goto");
if (gotos) {
  [].forEach.call(gotos, (e) => {
    e.addEventListener("click", () => {
      const link = e.getAttribute("href");
      if (link) {
        const box = document
          .querySelector("." + link.split("#")[1])
          .getBoundingClientRect();
        let headerOffset = 0;
        if (menuIcon.classList.contains("active")) {
          headerOffset = menuHeader.offsetHeight;
        }
        window.scrollTo({
          top: box.top + pageYOffset - headerOffset, // menuHeader.offsetHeight,
          behavior: "smooth",
        });
      }
    });
  });
}

menuIcon.addEventListener("click", () => {
  function toggleClass(c) {
    menuIcon.classList.toggle(c);
    menu.classList.toggle(c);
    [].forEach.call(links, (lnk) => {
      lnk.classList.toggle("active");
    });
    document.body.classList.toggle("lock");
  }
  toggleClass("active");

  function linkCB() {
    toggleClass("active");
    [].forEach.call(links, (l) => {
      l.removeEventListener("click", linkCB);
    });
  }

  [].forEach.call(links, (l) => {
    l.addEventListener("click", linkCB);
  });
});
