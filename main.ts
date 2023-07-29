interface WeightData {
  date: string;
  weight: number;
};

document.addEventListener('DOMContentLoaded', function () {
  const addButton: HTMLButtonElement = document.getElementById('add-button') as HTMLButtonElement;
  addButton.addEventListener('click', function () {
    saveData();
    displayRecords();
  });

  displayRecords();
});


function saveData() {
  const dateInput: HTMLInputElement = document.getElementById("date-input") as HTMLInputElement;
  const weightInput: HTMLInputElement = document.getElementById("weight-input") as HTMLInputElement;

  const dateValue: string = dateInput.value;
  const weightValue: number = parseFloat(weightInput.value);

  if (dateValue && weightValue) {
    const data: WeightData = {
      date: dateValue,
      weight: weightValue,
    };
    

  const existingRecords: WeightData[] = JSON.parse(localStorage.getItem('weightData') || '[]');

  existingRecords.push;

  localStorage.setItem("weightData", JSON.stringify(existingRecords));
  alert("Success");
} else {
  alert("field empty, try again");
}

}

function displayRecords() {
  const recordsContainer: HTMLElement = document.getElementById('records') as HTMLElement;

  const existingRecords: WeightData[] = JSON.parse(localStorage.getItem('weightData') || '[]');

  existingRecords.sort;

  recordsContainer.innerHTML = '';

  for (const record of existingRecords) {
    const recordElement = document.createElement('div');
    recordElement.innerText = `Date: ${record.date}, Weight: ${record.weight} kg`;
    recordsContainer.appendChild(recordElement);
  }
}



