// Seleksi elemen untuk display dan tombol
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".button");

let currentNumber = "";
let previousNumber = "";
let operator = "";

// Fungsi update display
function updateDisplay(value) {
    display.textContent = value || "0";
}

// Fungsi utama untuk kalkulasi
function calculate(a, operator, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "×":
            return a * b;
        case "÷":
            return a / b;
        default:
            return b;
    }
}

// Event Listener untuk tombol
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "AC") {
            currentNumber = "";
            previousNumber = "";
            operator = "";
            updateDisplay("0");
        } else if (value === "=") {
            currentNumber = calculate(previousNumber, operator, currentNumber).toString();
            previousNumber = "";
            operator = "";
            updateDisplay(currentNumber);
        } else if (value === "+" || value === "-" || value === "×" || value === "÷") {
            previousNumber = currentNumber;
            currentNumber = "";
            operator = value;
        } else if (value === "π") {
            currentNumber = Math.PI.toFixed(8); // Nilai π dengan 8 desimal
            updateDisplay(currentNumber);
        } else if (value === ".") {
            if (!currentNumber.includes(".")) {
                currentNumber += value;
            }
            updateDisplay(currentNumber);
        } else {
            currentNumber += value;
            updateDisplay(currentNumber);
        }
    });
});
