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
let currentYear = new Date();

function addErrorMessages(inputElement, inputHeading, errorMessage, isValidFn) {
  inputElement.addEventListener("input", () => {
    const isValid = isValidFn(inputElement.value);
    if (isValid) {
      inputHeading.style.color = "hsl(0, 100%, 67%)";
      inputElement.style.outlineColor = "hsl(0, 100%, 67%)";
      errorMessage.style.visibility = "visible";
    } else {
      inputHeading.style.color = "hsl(0, 1%, 44%)";
      inputElement.style.outlineColor = "hsl(0, 0%, 86%)";
      errorMessage.style.visibility = "hidden";
    }
  });
}

addErrorMessages(
  inputElements[0],
  inputHeadings[0],
  errorMsg[0],
  (value) => value < 1 || value > 31
);
addErrorMessages(
  inputElements[1],
  inputHeadings[1],
  errorMsg[1],
  (value) => value < 1 || value > 12
);
addErrorMessages(
  inputElements[2],
  inputHeadings[2],
  errorMsg[2],
  (value) => value > currentYear.getFullYear()
);

function isValidDate(year, month, day) {
  let date = new Date(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    console.log("not vaLid date");
    return;
  } else {
    console.log("vaLid date");
  }
}
function getDifference(year, month, day) {
  const currentDate = new Date();
  let birthdate = new Date(year, month, day);

  const diff = currentDate - birthdate;
  const ageInYears = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  const ageInMonths = Math.floor(diff / (30.44 * 24 * 60 * 60 * 1000));
  const ageInDays = Math.floor(diff / (24 * 60 * 60 * 1000));

  const monthsRemainder = ageInMonths - ageInYears * 12;
  const daysRemainder = ageInDays - ageInMonths * 30.44;

  yearOutput.innerText = ageInYears;
  monthOutput.innerText = parseInt(monthsRemainder);
  dayOutput.innerText = parseInt(daysRemainder);
}
form.addEventListener("submit", () => {
  event.preventDefault();
  if (
    !isValidDate(
      parseInt(year.value),
      parseInt(month.value - 1),
      parseInt(day.value)
    )
  ) {
    getDifference(year.value, month.value - 1, day.value);
  } else {
    console.error("Invalid date");
  }
});
