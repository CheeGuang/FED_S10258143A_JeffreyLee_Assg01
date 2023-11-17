// Load Nav Bar
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
  })
  .catch((error) => console.error(error));

// Load Nav Bar
let firstLoad = true;
function loadCartNavBar() {
  if (firstLoad) {
    fetch("navbarcart.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("navbar-container").innerHTML = data;
      })
      .catch((error) => console.error(error));

    firstLoad = false;
  }
  setTimeout(() => {
    updateCartCounter();
  }, "100");
}

// Load Navbar with Checkout upon clicking "Add to Cart"
var path = window.location.pathname;
var page = path.split("/").pop();
if (page === "checkout.html") {
  loadCartNavBar();
}

// Fetch and insert the footer HTML using JavaScript
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch((error) => console.error(error));

// Function to dynamically display name of Start Order Action
function action1_insert_name(clicked_id) {
  if (clicked_id === "startorder-option-dinein") {
    document.getElementById("startorder-action1-box-header").innerHTML =
      document
        .getElementById("startorder-action1-box-header")
        .innerHTML.replace("%OrderType%", "Dine In");
    document.getElementById("startorder-action1-box-header").innerHTML =
      document
        .getElementById("startorder-action1-box-header")
        .innerHTML.replace("Takeaway", "Dine In");
  } else if (clicked_id === "startorder-option-takeaway") {
    document.getElementById("startorder-action1-box-header").innerHTML =
      document
        .getElementById("startorder-action1-box-header")
        .innerHTML.replace("%OrderType%", "Takeaway");
    document.getElementById("startorder-action1-box-header").innerHTML =
      document
        .getElementById("startorder-action1-box-header")
        .innerHTML.replace("Dine In", "Takeaway");
  }
}

// Function to dynamically update name of day in dropdown bar
// Get the current date
let currentDate = new Date();

// Calculate the timestamp for tomorrow
let tomorrowTimestamp = currentDate.getTime() + 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds

// Create a new Date object for tomorrow
let tomorrowDate = new Date(tomorrowTimestamp);

// Get the day of the week for tomorrow (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
let dayOfWeekTomorrow = tomorrowDate.getDay();

let dayAfterTomorrowTimestamp = currentDate.getTime() + 2 * 24 * 60 * 60 * 1000; // Add 48 hours in milliseconds

// Create a new Date object for the day after tomorrow
let dayAfterTomorrowDate = new Date(dayAfterTomorrowTimestamp);

// Get the day of the week for the day after tomorrow (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
let dayOfWeekDayAfterTomorrow = dayAfterTomorrowDate.getDay();

// Define an array of day names for reference
let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Get the day name for tomorrow
let dayNameTomorrow = dayNames[dayOfWeekTomorrow];

// Get the day name for the day after tomorrow
let dayNameDayAfterTomorrow = dayNames[dayOfWeekDayAfterTomorrow];

function action2_insert_day() {
  document.getElementById("delivery-day-tmr").innerHTML = document
    .getElementById("delivery-day-tmr")
    .innerHTML.replace("%Tmr%", dayNameTomorrow);

  document.getElementById("delivery-day-dayafttmr").innerHTML = document
    .getElementById("delivery-day-dayafttmr")
    .innerHTML.replace("%DayAftTmr%", dayNameDayAfterTomorrow);
}

// Display Loading function and load index.html
function showLoader() {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  setTimeout(function () {
    overlay.style.display = "none";
  }, 4000); // Display for 1 second
  window.open("index.html", "_blank");
}

// Counter Logic for Item Display
let countValue = 1;

function updateCounter(value) {
  document.getElementById("display-item-footer-counter-number").innerText =
    value;
}

function increment() {
  countValue++;
  updateCounter(countValue);
}

function decrement() {
  if (countValue !== 1) {
    countValue--;
    updateCounter(countValue);
  }
}

// Update Cart Count
let countCartCounter = 0;
let totalCartPrice = 0;
function updateCartCounter() {
  // Update Cart Item Count
  countCartCounter += countValue;
  document.getElementById("nav-summary-basket-count").innerText =
    countCartCounter;
  countCounter = 1;

  // Update Cart Item Price
  totalCartPrice += calcTotalItemPrice();
  document.getElementById("nav-summary-basket-price").innerText =
    "$" + parseFloat(totalCartPrice).toFixed(2);
}

// Update Content in Display Item
function getImagePathDisplayImage(element) {
  // Get Image Path from selected item
  var imgElement = element.querySelector("img");
  if (imgElement) {
    var imgPath = imgElement.src;
    replaceImagePath(imgPath);
  }
  countValue = 1;
  updateCounter(1);
}

// Replace Image tag path with given path
function replaceImagePath(newPath) {
  var image = document.getElementById("menu-item-img"); // Get the image element by its ID
  if (image) {
    image.src = newPath; // Set the new image path
  } else {
    console.log("Image element not found");
  }
}

// Get Price of Item
function getItemPrice(element) {
  var itemPrice = element.querySelector(".menu-item-price").innerText;
  itemPrice = itemPrice.slice(1);
  itemPrice = Number(itemPrice).toFixed(2);

  localStorage.setItem("selectedItemPrice", itemPrice);
}

// Calculate Total Price
function calcTotalItemPrice() {
  var ItemQuantity = document.getElementById(
    "display-item-footer-counter-number"
  ).innerText;
  return localStorage.getItem("selectedItemPrice") * ItemQuantity;
}
