window.addEventListener("scroll", function () {
  const thresholdHotDeal = 1000;
  const thresholdChicken = 1600;
  const thresholdBoxes = 2352;
  const thresholdBurger = 3199;
  const thresholdWrap = 3699;
  const thresholdDrink = 4914;
  const thresholdSide = 6022;
  const thresholdBowl = 6500;
  const thresholdFor4 = 8000;
  const currentScroll = window.scrollY || window.pageYOffset;

  if (currentScroll < thresholdHotDeal) {
    selectCategory(currentScroll);
  }
});

function selectCategory(currentScroll) {
  // Replace this with the code you want to execute
  console.log(currentScroll);
}
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
