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
    if (numArray[0] === "0" && !numArray.includes(".") || numArray[0] == undefined || numArray.join("").match(/[a-zA-Z]/g)) return;

    let number = Math.round((+(numArray.join("")) / 100) * 1000) / 1000;
    updateDisplay(number);

    while (numArray.length > 0) numArray.pop();

    for (let num of number.toString()) {
        numArray.push(num);
    }
}

function changeSign(numArray) {
    if (numArray[0] === "0" && !numArray.includes(".") || numArray[0] == undefined || numArray.join("").match(/[a-zA-Z]/g)) return;

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

function updateNumberWithButton(button) {
    if (num1.join("").match(/[a-zA-Z]/g)) return;

    if (button.classList.contains("decimal")) {
        if (operator.length > 0) {
            if (num2.includes(".")) return;

            if (num2.length < 1) {
                num2.push("0");
            }
        } else {
            if (num1.includes(".") && overridable === false) return;

            if (num1.length < 1) {
                num1.push("0");
            } else if (num1.length >= 1 && overridable === true) {
                overridable = false;
                while (num1.length > 0) num1.pop();
                num1.push("0");
            }
        }
    }

    if (button.classList.contains("zero")) {
        if (operator.length > 0) {
            if (num2[0] == 0 && !num2.includes(".")) return;
        } else {
            if (num1[0] == 0 && !num1.includes(".")) return;
        }
    }

    if (operator.length > 0) {
        num2.push(button.textContent);
        if (num2[0] == 0 && !num2.includes(".") && num2.length > 1) num2.shift();
        updateDisplay(num2.join(""));
    } else {
        if (overridable) {
            overridable = false;
            while (num1.length > 0) num1.pop();
        }
        num1.push(button.textContent);
        if (num1[0] == 0 && !num1.includes(".") && num1.length > 1) num1.shift();
        updateDisplay(num1.join(""));
    }
}

function updateNumberWithKey(key) {
    if (num1.join("").match(/[a-zA-Z]/g)) return;

    if (key === ".") {
        if (operator.length > 0) {
            if (num2.includes(".")) return;

            if (num2.length < 1) {
                num2.push("0");
            }
        } else {
            if (num1.includes(".") && overridable === false) return;

            if (num1.length < 1) {
                num1.push("0");
            } else if (num1.length >= 1 && overridable === true) {
                overridable = false;
                while (num1.length > 0) num1.pop();
                num1.push("0");
            }
        }
    }

    if (key === "0") {
        if (operator.length > 0) {
            if (num2[0] == 0 && !num2.includes(".")) return;
        } else {
            if (num1[0] == 0 && !num1.includes(".")) return;
        }
    }

    if (operator.length > 0) {
        num2.push(key);
        if (num2[0] == 0 && !num2.includes(".") && num2.length > 1) num2.shift();
        updateDisplay(num2.join(""));
    } else {
        if (overridable) {
            overridable = false;
            while (num1.length > 0) num1.pop();
        }
        num1.push(key);
        if (num1[0] == 0 && !num1.includes(".") && num1.length > 1) num1.shift();
        updateDisplay(num1.join(""));
    }
}

function updateOperator(op) {
    if (num1.join("").match(/[a-zA-Z]/g)) return;
        if (num2.length > 0) solve();
        operator[0] = op;
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

let overridable = false;

numBtns.forEach(button => {
    button.addEventListener("click", () => {
        updateNumberWithButton(button);
    });
});

opBtns.forEach(button => {
    button.addEventListener("click", (e) => {
        updateOperator(button.textContent);
    });
});

signBtn.addEventListener("click", (e) => {
    if (operator.length > 0) {
        changeSign(num2);
    } else {
        changeSign(num1);
    }
});

percentBtn.addEventListener("click", (e) => {
    if (operator.length > 0) {
        percent(num2);
    } else {
        percent(num1);
    }
});

clearBtn.addEventListener("click", clearDisplay);
equalsBtn.addEventListener("click", (e) => {
    if (num2.length > 0) {
        solve();
        overridable = true;
    } else {
        display.textContent = num1.join("");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
        clearDisplay();
    } else if (e.key.match(/[0-9\.]/g)) {
        updateNumberWithKey(e.key);
    } else if (e.key.match(/[+\-*Xx×/÷]/g)) {
        updateOperator(e.key);
    } else if (e.key === "Enter") {
        if (num2.length > 0) {
            solve();
            overridable = true;
        } else {
            display.textContent = num1.join("");
        }
    } else if (e.key === "%") {
        if (operator.length > 0) {
            percent(num2);
        } else {
            percent(num1);
        }
    }
});