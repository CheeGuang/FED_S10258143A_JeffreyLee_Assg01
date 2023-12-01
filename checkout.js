// Welcome Animation
document.addEventListener("load", hideWelcomeAnimation());

function hideWelcomeAnimation() {
  setTimeout(() => {
    document.getElementById("checkout-welcome-animation").style.display =
      "none";
  }, "3190");
}

// Apply Promo Animation
function displayPromoAnimation() {
  document.getElementById("checkout-promo-animation").style.display = "block";
  setTimeout(() => {
    document.getElementById("checkout-promo-animation").style.display = "none";
  }, "2150");
}
