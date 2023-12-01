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
  try {
    if (localStorage.getItem("cart").length !== 2) {
      setTimeout(() => {
        updateCartCounter();
      }, "100");
    }
  } catch {}
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

// Insert The following 2 days into the Delivery Time Dropdown Box
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
    document.getElementById("checkout-checkout-animation").style.display =
      "block";
    setTimeout(() => {
      document.getElementById("checkout-checkout-animation").style.display =
        "none";
      window.location.href = "index.html";
    }, "1500");
  }, 2500); // Display for 1 second
}

// Display Loading function and load index.html
function showAction() {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
}

// Item Display Logic -------------------------------------------------------------------------------------------
function displayItem(value) {
  getImagePathDisplayImage(value);
  getItemPrice(value);
  updateDisplayItemTitle(value);
  updateDisplayItemPrice(value);
  // Access the body element
  var bodyElement = document.getElementsByTagName("html")[0];
  // Hide overflow on the body
  // bodyElement.style.overflow = "hidden";
}

// Counter Logic for Item Display
let countValue = 1;

function updateCounter(value) {
  document.getElementById("display-item-footer-counter-number").innerText =
    value;
  console.log(
    document.getElementById("display-item-footer-counter-number").innerText
  );
  document.getElementById("display-item-box-header-price").innerText =
    "$" + Number(calcTotalItemPrice()).toFixed(2);
}

// Increment Button Funciton for Checkout Page
function increment() {
  countValue++;
  updateCounter(countValue);
}

// Decrement Button Funciton for Checkout Page
function decrement() {
  if (countValue !== 1) {
    countValue--;
    updateCounter(countValue);
  }
}

// Load Navbar with Checkout upon clicking "Add to Cart"
var path = window.location.pathname;
var page = path.split("/").pop();
setTimeout(() => {
  if (page === "checkout.html") {
    loadCartNavBar();
    try {
      if (localStorage.getItem("cart").length !== 2) {
        setTimeout(() => {
          updateCartCounter();
          DisplayLocalStorageCartContent();
          document.getElementById("nav-cart").disabled = true;
          document.getElementById("nav-checkout").disabled = true;
        }, "100");
      }
    } catch {}
  } else if (page === "menu.html") {
    loadCartNavBar();
    try {
      if (localStorage.getItem("cart").length !== 2) {
        setTimeout(() => {
          updateCartCounter();
        }, "100");
      }
    } catch {}
  }
}, "350");

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
  // Get Details of Item to Add to Cart
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
  // Check if Cart In Local Storage is Empty
  if (localStorage.getItem("cart") !== null) {
    // Is Cart is Not Empty
    var itemExist = false;

    // Add Existing Cart In Local Storage to cart Variable
    cart = JSON.parse(localStorage.getItem("cart"));

    for (i of cart) {
      // Loop Cart to check if Item to Add Exists in Cart
      if (itemDetails["title"] === i["title"]) {
        // If Item Exists In Cart, Update Its Quantity and Total Price
        i["quantity"] =
          parseFloat(i["quantity"]) + parseFloat(itemDetails["quantity"]);
        i["totalPrice"] += itemDetails["totalPrice"];

        // Update Flag
        itemExist = true;
        break;
      }
    }

    //
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

    // Add HTML content for each item in Local Storage
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
        <button onClick="checkoutDecrementDisplayCart(this)">-</button>
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

// Decrement Button for Menu Page
function checkoutDecrement(element) {
  let cart = [];
  let subtotal = 0;
  let delivery = 6;
  let deletedItem = false;

  // Getting Elements to get Item Details
  const mainParentDiv = element.parentElement.parentElement;
  const parentDiv = element.parentElement;
  const selectedTitle = mainParentDiv.querySelector("h4").innerText;
  const itemPrice = mainParentDiv.lastElementChild;
  let selectedQuantity = parentDiv.querySelector("h2");
  let localStorageCart = JSON.parse(localStorage.getItem("cart"));

  // Loop Cart to Access Item to Decrement
  for (i = 0; i < localStorageCart.length; i++) {
    let localStorageImagePath = localStorageCart[i]["imagePath"];
    let localStoragePrice = localStorageCart[i]["price"];
    let localStorageQuantity = parseInt(localStorageCart[i]["quantity"]);
    let localStorageTitle = localStorageCart[i]["title"];
    let localStorageTotalPrice = localStorageCart[i]["totalPrice"];

    // Access Item to Decrement
    if (localStorageTitle === selectedTitle) {
      // Check whether to to decrease quantity or delete item
      if (localStorageQuantity !== 1) {
        localStorageQuantity--;
        localStorageTotalPrice = localStoragePrice * localStorageQuantity;
        selectedQuantity.innerText = localStorageQuantity;
        itemPrice.innerText =
          "$" + parseFloat(localStorageTotalPrice).toFixed(2);
        // document.getElementById("display-item-box-header-price").innerText =
        //   "$" + Number(calcTotalItemPrice()).toFixed(2);
      }

      // If item quantity is 1, delete item from Local Storage
      else {
        deletedItem = true;
        continue;
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

  // Calculating Total Price
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
  console.log(cart);
  if (cart.length == 0) {
    document.getElementById("nav-summary-basket-count").innerText = "0";
  }
}

// Drecrement Function for Display Cart
function checkoutDecrementDisplayCart(element) {
  let innitCart = JSON.parse(localStorage.getItem("cart")).length;
  checkoutDecrement(element);
  let finalCart = JSON.parse(localStorage.getItem("cart")).length;

  if (innitCart != finalCart) {
    location.reload();
  }
}

// Increent Function for Checkout Page
function checkoutIncrement(element) {
  let cart = [];
  let subtotal = 0;
  let delivery = 6;

  // Getting Parent Element
  const mainParentDiv = element.parentElement.parentElement;
  const parentDiv = element.parentElement;
  const selectedTitle = mainParentDiv.querySelector("h4").innerText;
  const itemPrice = mainParentDiv.lastElementChild;
  let selectedQuantity = parentDiv.querySelector("h2");
  let localStorageCart = JSON.parse(localStorage.getItem("cart"));

  // Looping Cart to access Item to Increment
  for (i = 0; i < localStorageCart.length; i++) {
    let localStorageImagePath = localStorageCart[i]["imagePath"];
    let localStoragePrice = localStorageCart[i]["price"];
    let localStorageQuantity = parseInt(localStorageCart[i]["quantity"]);
    let localStorageTitle = localStorageCart[i]["title"];
    let localStorageTotalPrice = localStorageCart[i]["totalPrice"];

    // Accessing Item to Increment
    if (localStorageTitle === selectedTitle) {
      localStorageQuantity++;
      localStorageTotalPrice = localStoragePrice * localStorageQuantity;
      selectedQuantity.innerText = localStorageQuantity;
      itemPrice.innerText = "$" + parseFloat(localStorageTotalPrice).toFixed(2); // document.getElementById("display-item-box-header-price").innerText =
      //   "$" + Number(calcTotalItemPrice()).toFixed(2);
    }

    // Getting Item Details to Display
    itemDetails = {
      ["imagePath"]: localStorageImagePath,
      ["price"]: localStoragePrice,
      ["quantity"]: localStorageQuantity,
      ["title"]: localStorageTitle,
      ["totalPrice"]: localStorageTotalPrice,
    };

    // Calculating Subtotal Price
    subtotal += localStorageTotalPrice;
    cart.push(itemDetails);
  }

  // Calculating Total Price
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
    document.getElementById("checkout-promo-textbox").value = "ILOVEFED";
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
  let delivery = 6;

  htmlContent = `<div id="viewcart-title-hidden"></div>`;
  // Loop through Local Storage Cart and add each iteration to htmlContent
  for (i = 0; i < localStorageCart.length; i++) {
    let imagePath = localStorageCart[i]["imagePath"];
    let title = localStorageCart[i]["title"];
    let quantity = localStorageCart[i]["quantity"];
    let totalPrice = localStorageCart[i]["totalPrice"];

    // HTML Content of each item listing to add
    htmlContent += `
    <div class="cart-content">
      <img class="cart-content-image" src="${imagePath}" alt="${title}" />
      <span class="cart-content-details">
        <h4 class="cart-content-title">${title}</h4>
      </span>
      <span class="cart-content-counter">
        <button class="cart-content-counter-button" onClick="cartDecrement(this)">-</button>
        <h2 class="cart-content-counter-quantity">${quantity}</h2>
        <button class="cart-content-counter-button" onClick="cartIncrement(this)">+</button>
      </span>
      <h4 class="cart-content-price">${
        "$" + parseFloat(totalPrice).toFixed(2)
      }</h4>
    </div>`;

    // Calculating Subtotal of All Listings
    subtotal += totalPrice;
  }
  // Adding div for Formatting Purposes
  htmlContent += `<div id="viewcart-fee-detail-hidden"></div>`;
  let total = subtotal + delivery;
  // Insert the HTML content into the container element
  viewCartElement.innerHTML = htmlContent;

  // Update Subtotal and Total
  document.getElementById("viewcart-fees-subtotal").innerText =
    "$" + parseFloat(subtotal).toFixed(2);
  document.getElementById("viewcart-fees-total").innerText =
    "$" + parseFloat(total).toFixed(2);
}

// Decrement Function for Menu Cart Page
function cartDecrement(element) {
  let cart = [];
  let subtotal = 0;
  let delivery = 6;
  let deletedItem = false;

  // Getting the Relevant Elements to get Item Details
  const mainParentDiv = element.parentElement.parentElement;
  const parentDiv = element.parentElement;
  const selectedTitle = mainParentDiv.querySelector("h4").innerText;
  const itemPrice = mainParentDiv.lastElementChild;
  let selectedQuantity = parentDiv.querySelector("h2");
  let localStorageCart = JSON.parse(localStorage.getItem("cart"));

  // Looping Through Local Storage
  for (i = 0; i < localStorageCart.length; i++) {
    let localStorageImagePath = localStorageCart[i]["imagePath"];
    let localStoragePrice = localStorageCart[i]["price"];
    let localStorageQuantity = parseInt(localStorageCart[i]["quantity"]);
    let localStorageTitle = localStorageCart[i]["title"];
    let localStorageTotalPrice = localStorageCart[i]["totalPrice"];

    // Accessing Item to Decrement
    if (localStorageTitle === selectedTitle) {
      // Checking Whether to delete item or to Change Quantity
      if (localStorageQuantity !== 1) {
        localStorageQuantity--;
        localStorageTotalPrice = localStoragePrice * localStorageQuantity;
        selectedQuantity.innerText = localStorageQuantity;
        itemPrice.innerText =
          "$" + parseFloat(localStorageTotalPrice).toFixed(2);
      } else {
        deletedItem = true;
        continue;
      }
    }

    // Getting Item Detail to display
    itemDetails = {
      ["imagePath"]: localStorageImagePath,
      ["price"]: localStoragePrice,
      ["quantity"]: localStorageQuantity,
      ["title"]: localStorageTitle,
      ["totalPrice"]: localStorageTotalPrice,
    };

    // Calculating Subtotal of all item in cart
    subtotal += localStorageTotalPrice;
    cart.push(itemDetails);
  }

  // Calculating Total Price to pay
  let total = subtotal + delivery;
  if (promoIsApplied) {
    total -= 5;
  }
  if (deletedItem) {
    displayCart("menu");
    setTimeout(() => {
      displayCart("menu");
    }, "100");
  }
  // Update Subtotal and Total
  document.getElementById("viewcart-fees-subtotal").innerText =
    "$" + parseFloat(subtotal).toFixed(2);
  document.getElementById("viewcart-fees-total").innerText =
    "$" + parseFloat(total).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
  console.log(cart);

  // Setting Cart Counter to 0 if cart is empty
  if (cart.length == 0) {
    document.getElementById("nav-summary-basket-count").innerText = "0";
  }
}

// Increment Cart Function for Menu Cart
function cartIncrement(element) {
  let cart = [];
  let subtotal = 0;
  let delivery = 6;

  // Getting Relevant Elements to get Item Details
  const mainParentDiv = element.parentElement.parentElement;
  const parentDiv = element.parentElement;
  const selectedTitle = mainParentDiv.querySelector("h4").innerText;
  const itemPrice = mainParentDiv.lastElementChild;
  let selectedQuantity = parentDiv.querySelector("h2");
  let localStorageCart = JSON.parse(localStorage.getItem("cart"));

  // Looping Cart to Access Item to Increment
  for (i = 0; i < localStorageCart.length; i++) {
    let localStorageImagePath = localStorageCart[i]["imagePath"];
    let localStoragePrice = localStorageCart[i]["price"];
    let localStorageQuantity = parseInt(localStorageCart[i]["quantity"]);
    let localStorageTitle = localStorageCart[i]["title"];
    let localStorageTotalPrice = localStorageCart[i]["totalPrice"];
    // Accessing Item to Increment
    if (localStorageTitle === selectedTitle) {
      localStorageQuantity++;
      localStorageTotalPrice = localStoragePrice * localStorageQuantity;
      selectedQuantity.innerText = localStorageQuantity;
      itemPrice.innerText = "$" + parseFloat(localStorageTotalPrice).toFixed(2); // document.getElementById("display-item-box-header-price").innerText =
      //   "$" + Number(calcTotalItemPrice()).toFixed(2);
    }

    // Getting item details of incremented item
    itemDetails = {
      ["imagePath"]: localStorageImagePath,
      ["price"]: localStoragePrice,
      ["quantity"]: localStorageQuantity,
      ["title"]: localStorageTitle,
      ["totalPrice"]: localStorageTotalPrice,
    };

    // Calculating total of all items in local storage
    subtotal += localStorageTotalPrice;
    cart.push(itemDetails);
  }

  // Calculating Total Price of Cart
  let total = subtotal + delivery;
  if (promoIsApplied) {
    total -= 5;
  }

  // Update Subtotal and Total
  document.getElementById("viewcart-fees-subtotal").innerText =
    "$" + parseFloat(subtotal).toFixed(2);
  document.getElementById("viewcart-fees-total").innerText =
    "$" + parseFloat(total).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
}

// Slide Show logic --------------------------------------------------------------------------------------
let slideIndex = 0;
showSlides();

// Slide Show Function
function showSlides() {
  let slides = document.getElementsByClassName("slide");

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Move to the next slide
  slideIndex++;

  // Reset index if it exceeds the number of slides
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  // Display the current slide
  slides[slideIndex - 1].style.display = "block";

  // Set timeout for the next slide
  setTimeout(showSlides, 4000); // Change image every 4 seconds
}

// Function to change slide manually
function changeSlide(n) {
  console.log(slideIndex);
  console.log("n" + n);
  slideIndex += n;
  console.log(slideIndex);
  let slides = document.getElementsByClassName("slide");

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Reset index if it exceeds the number of slides
  if (slideIndex > slides.length) {
    slideIndex = 1;
  } else if (slideIndex == 0) {
    slideIndex = slides.length - 1;
    console.log(slideIndex);
  }

  // Display the current slide
  slides[slideIndex - 1].style.display = "block";
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Make Overlay appear
function toggleOverlay() {
  const overlay = document.querySelector(".overlay-content");
  overlay.style.display =
    overlay.style.display === "none" || overlay.style.display === ""
      ? "flex"
      : "none";
}

// Turn off or on Overlay Background
function toggleOverlayBackground() {
  const overlay = document.querySelector(".overlay");
  overlay.style.display =
    overlay.style.display === "none" || overlay.style.display === ""
      ? "flex"
      : "none";
}
