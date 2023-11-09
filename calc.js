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

function percent(a) {
    return a / 100;
}

function operate(op, a, b) {
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "X":
        case "x":
        case "×":
        case "*":
            return multiply(a, b);
        case "/":
        case "÷":
            return divide(a, b);
        case "":
            return a;
        case "%":
            return percent(a);
        default:
            return `Invalid operator: "${op}"`;
    }
}

let num1 = "";
let num2 = "";
let operator = "";
let canOverrideNum1 = false;

const numBtns = document.querySelectorAll(".number");
const opBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");
const signBtn = document.querySelector(".sign");
const percentBtn = document.querySelector(".percent");
const display = document.querySelector(".display");

function clearDisplay() {
    display.textContent = "0";
    num1 = "";
    num2 = "";
    operator = "";
}

function calculate() {
    if (num2 === "") return;
    let result = (num1 !== "") ? operate(operator, +num1, +num2) : num2;

    if (isNaN(result)) {
        num1 = "";
    } else {
        result = Math.round(result * 1000) / 1000;
        num1 = result;
        canOverrideNum1 = true;
    }

    display.textContent = result;
    num2 = "";
    operator = "";

    return result;
}

function setNum(numToAssign) {
    if (canOverrideNum1 === true) {
        canOverrideNum1 = false;
        num1 = "";
    }

    (operator === "") 
    ? num1 += numToAssign
    : num2 += numToAssign;

    (operator === "")
    ? display.textContent = num1
    : display.textContent = num2;

    display.textContent = +display.textContent; // unary + to get rid of leading 0's
}

function setOperator(opToAssign) {
    if (operator !== "") calculate();
    operator = opToAssign;
    canOverrideNum1 = false;
}

function flipSign(num) {
    num *= -1;
    display.textContent = num;
}

numBtns.forEach(button => {
    button.addEventListener("click", () => {
        setNum(button.textContent);
    });

    button.addEventListener("mousedown", (e) => {
        e.preventDefault(); // prevents button focus
    });
});

opBtns.forEach(button => {
    button.addEventListener("click", () => {
        setOperator(button.textContent);
    });

    button.addEventListener("mousedown", (e) => {
        e.preventDefault(); // prevents button focus
    });
});

document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key.match(/^[0-9]+$/)) {
        setNum(e.key);

    } else if (e.key.match(/^[+\-Xx×*/÷]+$/)) {
        setOperator(e.key);

    } else if (e.key === "Backspace") {
        if (display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
            if (operator === "") {
                num1 = +display.textContent;
            } else {
                num2 = +display.textContent;
            }

        } else {
            if (operator === "") {
                num1 = 0;
            } else {
                num2 = 0;
            }
            display.textContent = 0;

        }
    } else if (e.key === "Enter") {
        calculate();
    }
});

clearBtn.addEventListener("click", clearDisplay);
clearBtn.addEventListener("mousedown", e => e.preventDefault());
equalsBtn.addEventListener("click", calculate);
equalsBtn.addEventListener("mousedown", e => e.preventDefault());
signBtn.addEventListener("click", () => {
    if (operator !== "") {
        flipSign(num1);
    } else {
        flipSign(num2);
    }
});

percentBtn.addEventListener("click", () => {
    display.textContent = operate("%", num1);
})