const img = document.querySelectorAll(".ibg");
Array.prototype.forEach.call(img, (value) => {
  if (value.querySelector("img")) {
    value.style.backgroundImage =
      "url(" + value.querySelector("img").getAttribute("src") + ")";
  }
});
