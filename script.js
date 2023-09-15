const day = document.getElementById("Day");
const month = document.getElementById("Month");
const year = document.getElementById("Year");
const button = document.querySelector("button");
const form = document.querySelector("form");
let yearOutput =
  document.querySelector(".output").children[0].firstElementChild;
let monthOutput =
  document.querySelector(".output").children[1].firstElementChild;
let dayOutput = document.querySelector(".output").children[2].firstElementChild;
let errorMsg = document.querySelectorAll(".error-msg");
let inputElements = document.querySelectorAll("input");
const inputHeadings = document.querySelectorAll(".input-headings");
let todaysDate = new Date();
let animationDuration = 50;

let messages = [
  "Must be a valid day",
  "Must be a valid month",
  "Must be in the past",
];

let validationFunctions = {
  0: (value) => (value < 1 || value > 31) && value !== "",
  1: (value) => (value < 1 || value > 12) && value !== "",
  2: (value) => value > todaysDate.getFullYear() && value !== "",
};
function displayError(heading, input, errorMsg, message, isValidFn) {
  input.addEventListener("input", () => {
    const isValid = isValidFn(input.value);
    if (isValid) {
      input.style.outlineColor = "hsl(0, 100%, 67%)";
      heading.style.color = "hsl(0, 100%, 67%)";
      errorMsg.innerText = message;
    } else if (input.value == "") {
      input.style.outlineColor = "hsl(0, 100%, 67%)";
      heading.style.color = "hsl(0, 100%, 67%)";
      errorMsg.innerText = "This field is required";
    } else {
      input.style.outlineColor = "hsl(0, 0%, 86%)";
      heading.style.color = "hsl(0, 1%, 44%)";
      errorMsg.innerText = "";
    }
  });
}
for (let i = 0; i < 3; i++) {
  displayError(
    inputHeadings[i],
    inputElements[i],
    errorMsg[i],
    messages[i],
    validationFunctions[i]
  );
}

function isValidDate(year, month, day) {
  let todaysDate = new Date();
  let date = new Date(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day ||
    date > todaysDate ||
    date.getFullYear() < 0
  ) {
    return false;
  } else {
    return true;
  }
}
function getDifference(year, month, day) {
  let birthdate = new Date(year, month, day);

  const diff = todaysDate - birthdate;
  const ageInYears = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  const ageInMonths = Math.floor(diff / (30.44 * 24 * 60 * 60 * 1000));
  const ageInDays = Math.floor(diff / (24 * 60 * 60 * 1000));

  const monthsRemainder = ageInMonths - ageInYears * 12;
  const daysRemainder = ageInDays - ageInMonths * 30.44;

  let yearAnimation = 0;
  let monthAnimation = 0;
  let dayAnimation = 0;

  const numberOfSteps = Math.floor(animationDuration / 10); // Assuming 10 ms interval

  yrInc = ageInYears / numberOfSteps;
  monInc = monthsRemainder / numberOfSteps;
  dayInc = daysRemainder / numberOfSteps;
  let a = setInterval(() => {
    yearAnimation += yrInc;
    monthAnimation += monInc;
    dayAnimation += dayInc;
    if (
      yearAnimation >= ageInYears &&
      monthAnimation >= parseInt(monthsRemainder) &&
      dayAnimation >= parseInt(daysRemainder)
    ) {
      clearInterval(a);
    }
    yearOutput.innerText = parseInt(yearAnimation);
    monthOutput.innerText = parseInt(monthAnimation);
    dayOutput.innerText = parseInt(dayAnimation);
  }, animationDuration);
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    isValidDate(
      parseInt(year.value),
      parseInt(month.value - 1),
      parseInt(day.value)
    )
  ) {
    getDifference(year.value, month.value - 1, day.value);
    for (let i = 0; i < 3; i++) {
      inputElements[i].style.outlineColor = "hsl(0, 0%, 86%)";
      inputHeadings[i].style.color = "hsl(0, 1%, 44%)";
      errorMsg[0].innerText = "";
    }
  } else {
    let date = new Date(
      inputElements[2].value,
      inputElements[1].value,
      inputElements[0].value
    );
    for (let i = 0; i < 3; i++) {
      inputElements[i].style.outlineColor = "hsl(0, 100%, 67%)";
      inputHeadings[i].style.color = "hsl(0, 100%, 67%)";
      if (date > todaysDate) {
        errorMsg[0].innerText = "Must be in the past";
      } else if (inputElements[i].value == "") {
        errorMsg[i].innerText = "This field is required";
      }else if (inputElements[2].value < 0) {
        errorMsg[0].innerText = "What are you? Jesus???";
      }
       else {
        errorMsg[0].innerText = "Must be a valid date";
      }
    }
  }
});
