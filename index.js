function toggleSplash() {
  const overlay = document.querySelector(".splash");
  overlay.style.display =
    overlay.style.display === "none" || overlay.style.display === ""
      ? "flex"
      : "none";
}
function animateRedScreen() {
  const redScreen = document.createElement("div");
  redScreen.classList.add("red-screen");
  document.body.appendChild(redScreen);

  setTimeout(() => {
    redScreen.remove();
  }, 1000); // Change the duration (in milliseconds) as needed
}

function splashScreen() {
  toggleSplash();
  setTimeout(() => {
    toggleSplash();
  }, "2400");
  setTimeout(() => {
    animateRedScreen();
  }, "1500");
}
addEventListener("load", splashScreen());

function openLocateUs() {
  window.location.href = "locate-us.html";
}

function openMenu() {
  window.location.href = "menu.html";
}
function openContactUs() {
  window.location.href = "contact-us.html";
}
