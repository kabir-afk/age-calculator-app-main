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
  } else {
    console.log("vaLid date");
  }
}
function getDifference(year, month, day) {
  let todaysDate = new Date();
  let birthDate = new Date(year, month, day);

  let yearDiff = todaysDate.getFullYear() - year;
  let monthDiff = todaysDate.getMonth() + 1 - month;
  let daysDiff = todaysDate.getDate() - day;
  
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff = 12 + monthDiff;
  }

  yearOutput.innerText = yearDiff;
  monthOutput.innerText = monthDiff;
  dayOutput.innerText = daysDiff;
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
    getDifference(year.value, month.value, day.value);
  }
  //   else{

  //   }
});
