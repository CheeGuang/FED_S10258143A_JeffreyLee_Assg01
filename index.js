// Toggle Splash Screen
function toggleSplash() {
  const overlay = document.querySelector(".splash");
  overlay.style.display =
    overlay.style.display === "none" || overlay.style.display === ""
      ? "flex"
      : "none";
}

// Function to Display Red screen
function animateRedScreen() {
  const redScreen = document.createElement("div");
  redScreen.classList.add("red-screen");
  document.body.appendChild(redScreen);

  setTimeout(() => {
    redScreen.remove();
  }, 1000); // Change the duration (in milliseconds) as needed
}

// Splash Screen Function
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

// Change Window to Locate Us
function openLocateUs() {
  window.location.href = "locate-us.html";
}

// Change Window to Menu
function openMenu() {
  window.location.href = "menu.html";
}

// Change Window to Contact Us
function openContactUs() {
  window.location.href = "contact-us.html";
}
