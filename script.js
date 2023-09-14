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
