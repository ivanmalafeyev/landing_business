const filter = document.querySelectorAll(".tab__navitem");
[].forEach.call(filter, (e) => {
  e.addEventListener("click", () => {
    const i = e.getAttribute("data-filter");
    if (i == "1") {
      [].forEach.call(
        document.querySelectorAll(".item-newsmedia__column"),
        (el) => {
          el.style.display = "block";
        }
      );
    } else {
      [].forEach.call(
        document.querySelectorAll(".item-newsmedia__column"),
        (el) => {
          el.style.display = "none";
        }
      );
      [].forEach.call(
        document.querySelectorAll(".item-newsmedia__column.f_" + i),
        (el) => {
          el.style.display = "block";
        }
      );
    }
    [].forEach.call(filter, (elem) => {
      elem.classList.remove("active");
    });
    e.classList.add("active");
  });
});
