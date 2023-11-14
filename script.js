// Load Nav Bar
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
  })
  .catch((error) => console.error(error));

// Fetch and insert the footer HTML using JavaScript
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch((error) => console.error(error));

// Function to dynamically display name of Start Order Action
function action1_insert_name(clicked_id) {
  console.log(clicked_id);
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
