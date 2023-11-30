// window.addEventListener("scroll", function () {
//   const thresholdHotDeal = 1000;
//   const thresholdChicken = 1600;
//   const thresholdBoxes = 2352;
//   const thresholdBurger = 3199;
//   const thresholdWrap = 3699;
//   const thresholdDrink = 4914;
//   const thresholdSide = 6022;
//   const thresholdBowl = 6500;
//   const thresholdFor4 = 8000;
//   const currentScroll = window.scrollY || window.pageYOffset;

//   if (currentScroll < thresholdHotDeal) {
//     selectCategory(currentScroll);
//   }
// });

// function selectCategory(currentScroll) {
//   // Replace this with the code you want to execute
//   console.log(currentScroll);
// }

const navbar = document.querySelector("#nav-horizontal");

navbar.addEventListener("scroll", function () {
  navbar.classList.remove("hide-scrollbar");
});

navbar.addEventListener("mouseleave", function () {
  navbar.classList.add("hide-scrollbar");
});

function toggleAddCartAnimation() {
  const overlay = document.getElementById("add-cart-animation");
  overlay.style.display =
    overlay.style.display === "none" || overlay.style.display === ""
      ? "flex"
      : "none";
}

function addToCart() {
  toggleAddCartAnimation();
  addItemToLocalStorage();
  loadCartNavBar();
  setTimeout(() => {
    toggleAddCartAnimation();
  }, "2000");
  showScrollBar();
}

function showScrollBar() {
  console.log("HIHI");
  // Access the body element
  var bodyElement = document.getElementsByTagName("html")[0];
  // Hide overflow on the body
  bodyElement.style.overflow = "scroll";
}
