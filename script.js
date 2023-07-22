// Initialize the days counter
let daysWithoutSmoking = 0;

// Get references to the elements
const daysCounterElement = document.getElementById("daysCounter");
const incrementButton = document.getElementById("incrementButton");

// Function to update the days counter display
function updateDaysCounter() {
    daysCounterElement.textContent = `${daysWithoutSmoking} day${daysWithoutSmoking === 1 ? '' : 's'}`;
}

// Function to increment the days counter
function incrementDaysCounter() {
    daysWithoutSmoking++;
    updateDaysCounter();
}

// Add event listener to the button
incrementButton.addEventListener("click", incrementDaysCounter);

// Update the counter display on page load
updateDaysCounter();
