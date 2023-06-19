let runningTotal = 0;
let buffer = "0";
let previousOperator;
let equation = "";

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        // This is not a number
        handleSymbol(value);
    } else {
        // This is a number
        handleNumber(value);
    }
    updateDisplay();
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            equation = "";
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) {
                // You need 2 numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            equation += buffer + "=";
            buffer = runningTotal;
            runningTotal = 0;
            previousOperator = null;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "") {
        // Do nothing if buffer is empty
        return;
    }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    equation += buffer + symbol;

    buffer = "";
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString; 
    }
}

function updateDisplay() {
    screen.innerText = equation + buffer;
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    });
}

init();
