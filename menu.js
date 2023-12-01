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

// Filter Feature
const filterElements = [
  document.getElementById("hotdeals"),
  document.getElementById("chicken"),
  document.getElementById("boxes"),
  document.getElementById("burger"),
  document.getElementById("wrap"),
  document.getElementById("drinks"),
  document.getElementById("sides"),
  document.getElementById("bowl"),
  document.getElementById("for2-4"),
  document.getElementById("for5"),
];
// prettier-ignore
const categoryNumber = {
  "hotDeals": 0,
  "chicken": 1,
  "boxes": 2,
  "burger": 3,
  "wrap": 4,
  "drinks": 5,
  "sides": 6,
  "bowl": 7,
  "for2-4":8,
  "for5": 9,
};
// prettier-ignore
const categoryContent = {
  "hotDeals": 9,
  "chicken": 2,
  "boxes": 6,
  "burger": 4,
  "wrap": 1,
  "drinks": 8,
  "sides": 9,
  "bowl": 2,
  "for2-4": 10,
  "for5": 3,
};

const itemsContent = document.getElementById("items");

let itemPriceTitle = [];
const articles = itemsContent.querySelectorAll("article");
console.log(articles.length);
for (i = 0; i < articles.length; i++) {
  let categoryPriceList = [];
  let itemList = articles[i].querySelector("ul").querySelectorAll("li");
  for (j = 0; j < itemList.length; j++) {
    categoryPriceList.push([
      itemList[j].querySelector(".menu-item-price").textContent,
      itemList[j].querySelector(".menu-item-title").textContent,
    ]);
  }
  itemPriceTitle.push(categoryPriceList);
}
console.log(itemPriceTitle);
// Function to be executed when a checkbox is checked
function displayFiltered() {
  let results = getFilters();
  clearMenuListing();
  console.log(results.length);
  console.log(results == []);
  if (results.length == 0) {
    displayMenuListing([
      "hotDeals",
      "chicken",
      "boxes",
      "burger",
      "wrap",
      "drinks",
      "sides",
      "bowl",
      "for2-4",
      "for5",
    ]);
  } else {
    displayMenuListing(results);
  }
}
function getFilters(event) {
  let results = [];
  for (i = 0; i < filterElements.length; i++) {
    if (filterElements[i].checked === true) {
      results.push(filterElements[i].name);
    }
  }
  console.log(results);
  return results;
}

// Get all checkbox elements
var checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Loop through each checkbox and add event listener for 'change' event
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", displayFiltered);
});

function clearMenuListing() {
  itemsContent.innerHTML = "";
}

function displayMenuListing(result) {
  let htmlContent = ``;
  for (i = 0; i < result.length; i++) {
    let categoryContent = ``;

    for (j = 0; j < itemPriceTitle[categoryNumber[result[i]]].length; j++) {
      console.log(itemPriceTitle[categoryNumber[result[i]]][1]);
      categoryContent += `
      <li class="menu-item" onClick="displayItem(this);hideCart()">
        <a href="#display-item" class="menu-item-display">
          <img src="assets/images/${
            result[i].charAt(0).toUpperCase() + result[i].slice(1) + (j + 1)
          }.jpg" alt="${itemPriceTitle[categoryNumber[result[i]]][j][1]}" />
          <h4 class="menu-item-title">${
            itemPriceTitle[categoryNumber[result[i]]][j][1]
          }</h4>
          <p class="menu-item-price">${
            itemPriceTitle[categoryNumber[result[i]]][j][0]
          }</p>
          <button class="menu-item-add">Add To Cart</button>
        </a>
      </li>`;
    }
    htmlContent += `
    <article id="${result[i]}" class="menu-category">
      <div class="menu-category-hidden"></div>
      <h1 class="menu-category-title">${
        result[i].charAt(0).toUpperCase() + result[i].slice(1)
      }
      </h1>
      <ul class="menu-items">
      ${categoryContent}
      </ul>
    </article>`;
  }
  console.log(htmlContent);
  itemsContent.innerHTML = htmlContent;
}
