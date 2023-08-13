const addButton: HTMLButtonElement = document.getElementById(
  "add-button"
) as HTMLButtonElement;
const dateInput: HTMLInputElement = document.getElementById(
  "date-input"
) as HTMLInputElement;
const weightInput: HTMLInputElement = document.getElementById(
  "weight-input"
) as HTMLInputElement;
const currentWeightDisplay: HTMLDivElement = document.getElementById(
  "current-weight-display"
) as HTMLDivElement;
const startWeightDisplay: HTMLDivElement = document.getElementById(
  "start-weight-display"
) as HTMLDivElement;
const progressDisplay: HTMLDivElement = document.getElementById(
  "progress-display"
) as HTMLDivElement;
const weightHistory: HTMLUListElement = document.getElementById(
  "weight-history"
) as HTMLUListElement;
interface WeightData {
  date: string;
  weight: number;
}
let existingRecords: WeightData[] = JSON.parse(
  localStorage.getItem("weightData") || "[]"
);

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", function () {
    saveData();
    displayRecords();
  });
  resort();
  localStorage.setItem("weightData", JSON.stringify(existingRecords));
  displayRecords();
  datelimiter();
  historydisplay();
});

function saveData() {
  const dateValue: string = dateInput.value;
  const weightValue: number = parseFloat(weightInput.value);

  if (dateValue && weightValue) {
    const data: WeightData = {
      date: dateValue,
      weight: weightValue,
    };
    existingRecords.push(data);
    resort();
    localStorage.setItem("weightData", JSON.stringify(existingRecords));
    historydisplay();
    alert("Success");
  } else {
    alert("field empty, try again");
  }
}

function displayRecords() {
  if (existingRecords.length >= 2) {
    currentWeightDisplay.innerHTML =
      existingRecords[existingRecords.length - 1].weight.toString() + " kg";
    startWeightDisplay.innerHTML = existingRecords[0].weight.toString() + " kg";
    if (
      existingRecords[existingRecords.length - 1].weight -
        existingRecords[0].weight <
      0
    ) {
      progressDisplay.innerHTML =
        (
          existingRecords[existingRecords.length - 1].weight -
          existingRecords[0].weight
        ).toString() + " kg";
    } else {
      progressDisplay.innerHTML =
        "+" +
        (
          existingRecords[existingRecords.length - 1].weight -
          existingRecords[0].weight
        ).toString() +
        " kg";
    }
  }
}

function resort() {
  existingRecords.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB) {
      return 1;
    }
    if (dateA < dateB) {
      return -1;
    }
    return 0;
  });
}

function datelimiter() {
  var today = new Date();
  var year = today.getFullYear();
  var month = (today.getMonth() + 1).toString().padStart(2, "0");
  var day = today.getDate().toString().padStart(2, "0");
  const maxDate: string = year + "-" + month + "-" + day;
  dateInput.max = maxDate;
}

function historydisplay() {
  weightHistory.innerHTML = "";
  for (
    let i = existingRecords.length - 1;
    i > -1 && i > existingRecords.length - 11;
    i--
  ) {
    const entry = existingRecords[i];
    const li = document.createElement("li");
    li.innerHTML = entry.weight.toString() + " kg " + entry.date.toString();
    weightHistory.appendChild(li);
  }
}
