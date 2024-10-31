let display = document.getElementById('display');
let buttons = document.querySelectorAll('.button');
let themeToggle = document.getElementById('toggle-theme');

let currentNumber = '';
let previousNumber = '';
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    let buttonText = button.textContent;

    if (buttonText === 'AC') {
      clearAll();
    } else if (buttonText === '=' && currentNumber !== '') {
      calculateResult();
    } else if (buttonText === 'x²') {
      squareNumber();
    } else if (buttonText === 'π') {
      insertPhi();
    } else if (buttonText === '%') {
      percent();
    } else if (['+', '-', '*', '/'].includes(buttonText)) {
      setOperator(buttonText);
    } else if (buttonText === '.') {
      addDecimal();
    } else {
      appendNumber(buttonText);
    }

    updateDisplay();
  });
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});

function clearAll() {
  currentNumber = '';
  previousNumber = '';
  operator = '';
  display.textContent = '0';
}

function calculateResult() {
  if (previousNumber && currentNumber && operator) {
    currentNumber = calculate(previousNumber, operator, currentNumber).toString();
    previousNumber = '';
    operator = '';
    applyScientificNotation();
  }
}

function squareNumber() {
  if (currentNumber) {
    currentNumber = (parseFloat(currentNumber) ** 2).toString();
    applyScientificNotation();
  }
}

function insertPhi() {
  currentNumber = Math.PI.toFixed(5).toString();
  applyScientificNotation();
}

function percent() {
  if (currentNumber && previousNumber && operator) {
    currentNumber = (parseFloat(previousNumber) * parseFloat(currentNumber) / 100).toString();
  } else if (currentNumber) {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
  }
  applyScientificNotation();
}

function setOperator(op) {
  if (currentNumber === '' && previousNumber) {
    operator = op;
  } else if (currentNumber) {
    if (previousNumber) {
      calculateResult();
    }
    previousNumber = currentNumber;
    currentNumber = '';
    operator = op;
  }
}

function addDecimal() {
  if (!currentNumber.includes('.')) {
    currentNumber += '.';
  }
}

function appendNumber(number) {
  currentNumber += number;
}

function calculate(a, operator, b) {
  let result = 0;

  switch (operator) {
    case '+':
      result = parseFloat(a) + parseFloat(b);
      break;
    case '-':
      result = parseFloat(a) - parseFloat(b);
      break;
    case '*':
      result = parseFloat(a) * parseFloat(b);
      break;
    case '/':
      result = parseFloat(a) / parseFloat(b);
      break;
  }

  return result;
}

function applyScientificNotation() {
  if (Math.abs(parseFloat(currentNumber)) >= 1e7 || Math.abs(parseFloat(currentNumber)) < 1e-5) {
    currentNumber = parseFloat(currentNumber).toExponential(5);
  }
}

function updateDisplay() {
  display.textContent = currentNumber || previousNumber || '0';
}
