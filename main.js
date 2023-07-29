;
document.addEventListener('DOMContentLoaded', function () {
    var addButton = document.getElementById('add-button');
    addButton.addEventListener('click', function () {
        saveData();
        displayRecords();
    });
    displayRecords();
});
function saveData() {
    var dateInput = document.getElementById("date-input");
    var weightInput = document.getElementById("weight-input");
    var dateValue = dateInput.value;
    var weightValue = parseFloat(weightInput.value);
    if (dateValue && weightValue) {
        var data = {
            date: dateValue,
            weight: weightValue,
        };
        var existingRecords = JSON.parse(localStorage.getItem('weightData') || '[]');
        existingRecords.push;
        localStorage.setItem("weightData", JSON.stringify(existingRecords));
        alert("Success");
    }
    else {
        alert("field empty, try again");
    }
}
function displayRecords() {
    var recordsContainer = document.getElementById('records');
    var existingRecords = JSON.parse(localStorage.getItem('weightData') || '[]');
    existingRecords.sort;
    recordsContainer.innerHTML = '';
    for (var _i = 0, existingRecords_1 = existingRecords; _i < existingRecords_1.length; _i++) {
        var record = existingRecords_1[_i];
        var recordElement = document.createElement('div');
        recordElement.innerText = "Date: ".concat(record.date, ", Weight: ").concat(record.weight, " kg");
        recordsContainer.appendChild(recordElement);
    }
}
