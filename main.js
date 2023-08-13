var addButton = document.getElementById("add-button");
var dateInput = document.getElementById("date-input");
var weightInput = document.getElementById("weight-input");
var currentWeightDisplay = document.getElementById("current-weight-display");
var startWeightDisplay = document.getElementById("start-weight-display");
var progressDisplay = document.getElementById("progress-display");
var weightHistory = document.getElementById("weight-history");
var existingRecords = JSON.parse(localStorage.getItem("weightData") || "[]");
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
    var dateValue = dateInput.value;
    var weightValue = parseFloat(weightInput.value);
    if (dateValue && weightValue) {
        var data = {
            date: dateValue,
            weight: weightValue,
        };
        existingRecords.push(data);
        resort();
        localStorage.setItem("weightData", JSON.stringify(existingRecords));
        historydisplay();
        alert("Success");
    }
    else {
        alert("field empty, try again");
    }
}
;
function displayRecords() {
    if (existingRecords.length >= 2) {
        currentWeightDisplay.innerHTML = existingRecords[existingRecords.length - 1].weight.toString() + " kg";
        startWeightDisplay.innerHTML = existingRecords[0].weight.toString() + " kg";
        if (existingRecords[existingRecords.length - 1].weight - existingRecords[0].weight < 0) {
            progressDisplay.innerHTML = (existingRecords[existingRecords.length - 1].weight - existingRecords[0].weight).toString() + " kg";
        }
        else {
            progressDisplay.innerHTML = '+' + (existingRecords[existingRecords.length - 1].weight - existingRecords[0].weight).toString() + " kg";
        }
        ;
    }
    ;
}
;
function resort() {
    existingRecords.sort(function (a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        if (dateA > dateB) {
            return 1;
        }
        if (dateA < dateB) {
            return -1;
        }
        return 0;
    });
}
;
function datelimiter() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, "0");
    var day = today.getDate().toString().padStart(2, "0");
    var maxDate = year + "-" + month + "-" + day;
    dateInput.max = maxDate;
}
;
function historydisplay() {
    weightHistory.innerHTML = '';
    for (var i = existingRecords.length - 1; i > -1 && i > existingRecords.length - 11; i--) {
        var entry = existingRecords[i];
        var li = document.createElement('li');
        li.innerHTML = entry.weight.toString() + ' kg ' + entry.date.toString();
        weightHistory.appendChild(li);
    }
}
;
