function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Are you crazy?";
    return a / b;
}

function operate(op, a, b) {
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        case "":
            return a;
        default:
            return `Invalid operator: "${op}"`;
    }
}

let num1 = "";
let num2 = "";
let operator = "";

const numBtns = document.querySelectorAll(".number");
const opBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");
const display = document.querySelector(".display");

function clearDisplay() {
    display.textContent = "0";
    num1 = "";
    num2 = "";
    operator = "";
}

function calculate() {
    let result = (num1 !== "") ? operate(operator, +num1, +num2) : num2;

    if (isNaN(result)) {
        num1 = "";
    } else {
        result = Math.round(result * 1000) / 1000;
        num1 = result;
    }

    console.log(`${num1} ${operator} ${num2} = ${result}`)
    display.textContent = result;
    num2 = "";
    operator = "";

    return result;
}

numBtns.forEach(button => {
    button.addEventListener("click", () => {
        operator === "" ? num1 += button.textContent : num2 += button.textContent;
        operator === "" ? display.textContent = num1 : display.textContent = num2;
        display.textContent = +display.textContent;
    });
});

opBtns.forEach(button => {
    button.addEventListener("click", () => {
        if (operator !== "") calculate();
        operator = button.textContent;
    });
});

clearBtn.addEventListener("click", clearDisplay);
equalsBtn.addEventListener("click", calculate);