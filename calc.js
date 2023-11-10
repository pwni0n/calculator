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

function percent(numArray) {
    if (numArray[0] === "0" && !numArray.includes(".") || numArray[0] == undefined) return;

    let number = Math.round((+(numArray.join("")) / 100) * 1000) / 1000;
    updateDisplay(number);

    while (numArray.length > 0) numArray.pop();

    for (let num of number.toString()) {
        numArray.push(num);
    }
}

function changeSign(numArray) {
    if (numArray[0] === "0" && !numArray.includes(".") || numArray[0] == undefined) return;

    if (!numArray.includes("-")) {
        numArray.unshift("-");
    } else {
        numArray.shift();
    }

    updateDisplay(numArray.join(""));
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
        case undefined:
            return a;
        case "%":
            return percent(a);
        default:
            return `Invalid operator: "${op}"`;
    }
}

function clearDisplay() {
    while (num1.length > 0) num1.pop();
    while (num2.length > 0) num2.pop();
    operator.pop();
    updateDisplay("0");
}

function updateDisplay(nums) {
    display.textContent = nums;
}

function overrideNum(numArray, numbers) {
    while (numArray.length > 0) numArray.pop();
    for (let num of numbers) {
        numArray.push(num);
    }
}

function solve() {
    let result = operate(operator[0], +(num1.join("")), +(num2.join("")));
    if (!isNaN(result)) {
        result = Math.round(result * 1000) / 1000;
    }

    overrideNum(num1, result.toString().split(""));
    while (num2.length > 0) num2.pop();
    operator.pop();
    updateDisplay(result);
}

const num1 = [];
const num2 = [];
const operator = [];

const numBtns = document.querySelectorAll(".number");
const opBtns = document.querySelectorAll(".operator");
const signBtn = document.querySelector(".sign");
const percentBtn = document.querySelector(".percent");
const clearBtn = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");

const display = document.querySelector(".display");

numBtns.forEach(button => {
    button.addEventListener("click", () => {
        if (button.classList.contains("decimal")) {
            if (operator.length > 0) {
                if (num2.includes(".")) return;
                
                if (num2.length < 1) {
                    num2.push("0");
                }
            } else {
                if (num1.includes(".")) return;

                if (num1.length < 1) {
                    num1.push("0");
                }
            }
        }

        if (operator.length > 0) {
            num2.push(button.textContent);
            updateDisplay(num2.join(""));
        } else {
            num1.push(button.textContent);
            updateDisplay(num1.join(""));
        }
    });
});

opBtns.forEach(button => {
    button.addEventListener("click", () => {
        if (num2.length > 0) solve();
        operator[0] = button.textContent;
    });
});

signBtn.addEventListener("click", () => {
    if (operator.length > 0) {
        changeSign(num2);
    } else {
        changeSign(num1);
    }
});

percentBtn.addEventListener("click", () => {
    if (operator.length > 0) {
        percent(num2);
    } else {
        percent(num1);
    }
});

clearBtn.addEventListener("click", clearDisplay);
equalsBtn.addEventListener("click", () => {
    if (num2.length > 0) {
        solve();
    } else {
        display.textContent = num1.join("");
    }
});
