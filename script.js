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

// Item Display Logic -------------------------------------------------------------------------------------------
function displayItem(value) {
  getImagePathDisplayImage(value);
  getItemPrice(value);
  updateDisplayItemTitle(value);
  updateDisplayItemPrice(value);
}

// Counter Logic for Item Display
let countValue = 1;

function updateCounter(value) {
  document.getElementById("display-item-footer-counter-number").innerText =
    value;
  document.getElementById("display-item-box-header-price").innerText =
    "$" + Number(calcTotalItemPrice()).toFixed(2);
}

function increment() {
  countValue++;
  console.log(countValue);
  updateCounter(countValue);
}

function decrement() {
  if (countValue !== 1) {
    countValue--;
    updateCounter(countValue);
  }
}

// Load Navbar with Checkout upon clicking "Add to Cart"
var path = window.location.pathname;
var page = path.split("/").pop();
if (page === "checkout.html") {
  loadCartNavBar();
  setTimeout(() => {
    updateCartCounter();
    DisplayLocalStorageCartContent();
  }, "350");
} else if (page === "menu.html") {
  loadCartNavBar();
  setTimeout(() => {
    updateCartCounter();
  }, "200");
}

let firstEnterMenu = true;
// Update Cart Count
function updateCartCounter() {
  // Retrieve Cart Details from Local Storage
  let localStorageCart = null;
  let localStorageCartPrice = null;
  let localStorageCartCounter = null;
  try {
    localStorageCart = JSON.parse(localStorage.getItem("cart"));
    for (i = 0; i < localStorageCart.length; i++) {
      localStorageCartCounter += localStorageCart[i]["quantity"];
    }
    localStorageCartPrice = JSON.parse(localStorage.getItem("price"));
    for (i = 0; i < localStorageCart.length; i++) {
      localStorageCartPrice += localStorageCart[i]["totalPrice"];
    }
  } catch {
    localStorageCartCounter = 0;
  }
  // Update Cart Item Count
  document.getElementById("nav-summary-basket-count").innerText =
    localStorageCartCounter;
  // Update Cart Item Price
  if (localStorageCartPrice !== null) {
    document.getElementById("nav-summary-basket-price").innerText =
      "$" + parseFloat(localStorageCartPrice).toFixed(2);
  } else {
    document.getElementById("nav-summary-basket-price").innerText = "$0.00";
  }
  firstEnterMenu = false;
}

// Update Image in Display Item
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

// Update Display Item Title
function updateDisplayItemTitle(value) {
  document.getElementById("display-item-box-header-title").innerText =
    value.querySelector(".menu-item-title").innerText;
}

// Update Display Item Price
function updateDisplayItemPrice(value) {
  document.getElementById("display-item-box-header-price").innerText =
    value.querySelector(".menu-item-price").innerText;
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

// Add To Cart Logic (Local Storage)
let cart = [];
function addItemToLocalStorage() {
  itemDetails = {
    ["title"]: document.getElementById("display-item-box-header-title")
      .innerText,
    ["quantity"]: parseFloat(
      document.getElementById("display-item-footer-counter-number").innerText
    ),
    ["price"]: parseFloat(localStorage.getItem("selectedItemPrice")),

    ["totalPrice"]: parseFloat(
      document
        .getElementById("display-item-box-header-price")
        .innerText.slice(1)
    ),
    ["imagePath"]: getImagePath(),
  };
  if (localStorage.getItem("cart") !== null) {
    var itemExist = false;
    cart = JSON.parse(localStorage.getItem("cart"));
    for (i of cart) {
      if (itemDetails["title"] === i["title"]) {
        i["quantity"] =
          parseFloat(i["quantity"]) + parseFloat(itemDetails["quantity"]);
        i["totalPrice"] += itemDetails["totalPrice"];
        itemExist = true;
        break;
      }
    }
    if (!itemExist) {
      cart.push(itemDetails);
    }
  } else {
    cart.push(itemDetails);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Get Image Path
function getImagePath() {
  // Get Image Path from selected item
  var imgElement = document.getElementById("menu-item-img");
  if (imgElement) {
    var imgPath = imgElement.src;
  }
  return imgPath;
}

// Checkout Page Order Summary Logic --------------------------------------------------------------------
// Get the element where you want to insert HTML content
const checkoutSummaryContents = document.getElementById(
  "checkout-summary-contents"
);

// HTML To be added
let htmlContent = ``;

// Display Items from Local Storage onto Checkout Page
function DisplayLocalStorageCartContent() {
  let localStorageCart = JSON.parse(localStorage.getItem("cart"));
  let subtotal = 0;
  let delivery = 6;

  // Loop through Local Storage Cart and add each iteration to htmlContent
  for (i = 0; i < localStorageCart.length; i++) {
    let imagePath = localStorageCart[i]["imagePath"];
    let title = localStorageCart[i]["title"];
    let quantity = localStorageCart[i]["quantity"];
    let totalPrice = localStorageCart[i]["totalPrice"];
    htmlContent += `
    <div class="checkout-summary-content">
      <img src="${imagePath}" alt="${title}" />
      <span class="checkout-summary-content-details">
        <h4>${title}</h4>
        <ul>
          <li>1x Example Item 1</li>
          <li>2x Example Item 2</li>
          <li>1x Example Item 3</li>
        </ul>
      </span>
      <span id="checkout-summary-content-counter">
        <button onClick="checkoutDecrement(this)">-</button>
        <h2 id="display-item-footer-counter-number">${quantity}</h2>
        <button onClick="checkoutIncrement(this)">+</button>
      </span>
      <h4>${"$" + parseFloat(totalPrice).toFixed(2)}</h4>
    </div>`;

    subtotal += totalPrice;
  }
  // Insert the HTML content into the container element
  checkoutSummaryContents.innerHTML = htmlContent;
  document.getElementById("checkout-summary-fees-subtotal").innerText =
    "$" + parseFloat(subtotal).toFixed(2);
  document.getElementById("checkout-summary-fees-total").innerText =
    "$" + parseFloat(subtotal + delivery).toFixed(2);
}

function checkoutDecrement(element) {
  let cart = [];
  let subtotal = 0;
  let delivery = 6;

  const mainParentDiv = element.parentElement.parentElement;
  const parentDiv = element.parentElement;
  const selectedTitle = mainParentDiv.querySelector("h4").innerText;
  const itemPrice = mainParentDiv.lastElementChild;
  let selectedQuantity = parentDiv.querySelector("h2");
  let localStorageCart = JSON.parse(localStorage.getItem("cart"));
  for (i = 0; i < localStorageCart.length; i++) {
    let localStorageImagePath = localStorageCart[i]["imagePath"];
    let localStoragePrice = localStorageCart[i]["price"];
    let localStorageQuantity = parseInt(localStorageCart[i]["quantity"]);
    let localStorageTitle = localStorageCart[i]["title"];
    let localStorageTotalPrice = localStorageCart[i]["totalPrice"];
    if (localStorageTitle === selectedTitle) {
      if (localStorageQuantity !== 1) {
        localStorageQuantity--;
        localStorageTotalPrice = localStoragePrice * localStorageQuantity;
        selectedQuantity.innerText = localStorageQuantity;
        itemPrice.innerText =
          "$" + parseFloat(localStorageTotalPrice).toFixed(2);
        // document.getElementById("display-item-box-header-price").innerText =
        //   "$" + Number(calcTotalItemPrice()).toFixed(2);
      }
    }
    itemDetails = {
      ["imagePath"]: localStorageImagePath,
      ["price"]: localStoragePrice,
      ["quantity"]: localStorageQuantity,
      ["title"]: localStorageTitle,
      ["totalPrice"]: localStorageTotalPrice,
    };
    subtotal += localStorageTotalPrice;
    cart.push(itemDetails);
  }
  let total = subtotal + delivery;
  if (promoIsApplied) {
    total -= 5;
  }

  // Update Subtotal and Total
  document.getElementById("checkout-summary-fees-subtotal").innerText =
    "$" + parseFloat(subtotal).toFixed(2);
  document.getElementById("checkout-summary-fees-total").innerText =
    "$" + parseFloat(total).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
}

function checkoutIncrement(element) {
  let cart = [];
  let subtotal = 0;
  let delivery = 6;

  const mainParentDiv = element.parentElement.parentElement;
  const parentDiv = element.parentElement;
  const selectedTitle = mainParentDiv.querySelector("h4").innerText;
  const itemPrice = mainParentDiv.lastElementChild;
  let selectedQuantity = parentDiv.querySelector("h2");
  let localStorageCart = JSON.parse(localStorage.getItem("cart"));
  for (i = 0; i < localStorageCart.length; i++) {
    let localStorageImagePath = localStorageCart[i]["imagePath"];
    let localStoragePrice = localStorageCart[i]["price"];
    let localStorageQuantity = parseInt(localStorageCart[i]["quantity"]);
    let localStorageTitle = localStorageCart[i]["title"];
    let localStorageTotalPrice = localStorageCart[i]["totalPrice"];
    if (localStorageTitle === selectedTitle) {
      localStorageQuantity++;
      localStorageTotalPrice = localStoragePrice * localStorageQuantity;
      selectedQuantity.innerText = localStorageQuantity;
      itemPrice.innerText = "$" + parseFloat(localStorageTotalPrice).toFixed(2); // document.getElementById("display-item-box-header-price").innerText =
      //   "$" + Number(calcTotalItemPrice()).toFixed(2);
    }
    itemDetails = {
      ["imagePath"]: localStorageImagePath,
      ["price"]: localStoragePrice,
      ["quantity"]: localStorageQuantity,
      ["title"]: localStorageTitle,
      ["totalPrice"]: localStorageTotalPrice,
    };
    subtotal += localStorageTotalPrice;
    cart.push(itemDetails);
  }
  let total = subtotal + delivery;
  if (promoIsApplied) {
    total -= 5;
  }

  // Update Subtotal and Total
  document.getElementById("checkout-summary-fees-subtotal").innerText =
    "$" + parseFloat(subtotal).toFixed(2);
  document.getElementById("checkout-summary-fees-total").innerText =
    "$" + parseFloat(total).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
}

// Promo Code Logic ------------------------------------------------------
let promoIsApplied = false;
function applyPromo() {
  if (!promoIsApplied) {
    // Insert Discount Element as Last Child
    // Create a new span element for the discount
    const discountSpan = document.createElement("span");
    discountSpan.classList.add("checkout-summary-fees");
    discountSpan.innerHTML = `<h4>Discount</h4><h4 id="checkout-summary-fees-discount">-$5.00</h4>`;

    // Get the parent element
    const parentElement = document.getElementById(
      "checkout-summary-feedetails"
    );

    // Get the element after which the new element needs to be inserted
    const deliveryElement = document.getElementById(
      "checkout-summary-fees-delivery"
    );

    // Insert the new discount element after the 'deliveryElement'
    parentElement.insertBefore(
      discountSpan,
      deliveryElement.nextElementSibling
    );

    // Inserting Discount Element Above Total Price
    if (parentElement && discountSpan) {
      // Check if the element has a previous sibling
      if (discountSpan.previousElementSibling) {
        // Move the element one position higher by inserting it before its previous sibling
        parentElement.insertBefore(
          discountSpan,
          discountSpan.previousElementSibling
        );
      } else {
        console.log("Element is already at the top");
      }
    } else {
      console.error("Parent container or element to move not found");
    }

    // Updating Total Price
    const totalElement = document.getElementById("checkout-summary-fees-total");
    totalElement.innerText =
      "$" + Number(parseFloat(totalElement.innerText.slice(1)) - 5).toFixed(2);
    promoIsApplied = true;
  }
}

// Clear Local Storage of cart
function clearCartLocalStorage() {
  localStorage.removeItem("cart");
}

// Display Cart
function displayCart() {
  // Get the content element
  const content = document.getElementById("viewcart");
  // Toggle the visibility of the content
  if (content.className === "displayed") {
    // content.style.display = "block";
    // content.style.transitionTimingFunction = "ease-in";
    content.classList.add("not-displayed");
    content.classList.remove("displayed");
  } else {
    // content.style.display = "none";
    content.classList.add("displayed");
    content.classList.remove("not-displayed");
  }
  DisplayLocalStorageCartContentToMenu();
}

// Hide Cart Menu
function hideCart() {
  // Get the content element
  const content = document.getElementById("viewcart");
  // Toggle the visibility of the content
  if (content.className === "displayed") {
    // content.style.display = "block";
    // content.style.transitionTimingFunction = "ease-in";
    content.classList.add("not-displayed");
    content.classList.remove("displayed");
  }
}

// Display Local Storage Cart to Menu Cart
// Display Items from Local Storage onto Checkout Page
const viewCartElement = document.getElementById("viewcart-contents");
function DisplayLocalStorageCartContentToMenu() {
  let localStorageCart = JSON.parse(localStorage.getItem("cart"));
  let subtotal = 0;
  // let delivery = 6;

  // Loop through Local Storage Cart and add each iteration to htmlContent
  for (i = 0; i < localStorageCart.length; i++) {
    let imagePath = localStorageCart[i]["imagePath"];
    let title = localStorageCart[i]["title"];
    let quantity = localStorageCart[i]["quantity"];
    let totalPrice = localStorageCart[i]["totalPrice"];
    // htmlContent += `
    // <div class="checkout-summary-content">
    //   <img src="${imagePath}" alt="${title}" />
    //   <span class="checkout-summary-content-details">
    //     <h4>${title}</h4>
    //     <ul>
    //       <li>1x Example Item 1</li>
    //       <li>2x Example Item 2</li>
    //       <li>1x Example Item 3</li>
    //     </ul>
    //   </span>
    //   <span id="checkout-summary-content-counter">
    //     <button onClick="checkoutDecrement(this)">-</button>
    //     <h2 id="display-item-footer-counter-number">${quantity}</h2>
    //     <button onClick="checkoutIncrement(this)">+</button>
    //   </span>
    //   <h4>${"$" + parseFloat(totalPrice).toFixed(2)}</h4>
    // </div>`;
    htmlContent += `
    <div class="checkout-summary-content">
      <img src="${imagePath}" alt="${title}" />
      <span class="checkout-summary-content-details">
        <h4>${title}</h4>
        <ul>
          <li>1x Example Item 1</li>
          <li>2x Example Item 2</li>
          <li>1x Example Item 3</li>
        </ul>
      </span>
      <h4>${"$" + parseFloat(totalPrice).toFixed(2)}</h4>
    </div>`;

    subtotal += totalPrice;
  }
  // Insert the HTML content into the container element
  viewCartElement.innerHTML = htmlContent;
  // document.getElementById("checkout-summary-fees-subtotal").innerText =
  //   "$" + parseFloat(subtotal).toFixed(2);
  // document.getElementById("checkout-summary-fees-total").innerText =
  //   "$" + parseFloat(subtotal + delivery).toFixed(2);
}
