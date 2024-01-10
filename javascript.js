const allButtons = document.querySelectorAll(".keypad button");
const valueText = document.querySelector("#value");
const operatorText = document.querySelector("#operator");
const totalText = document.querySelector("#total");

let currentValue = "";
let total = undefined;
let value = undefined;
let operator = "";

allButtons.forEach((button) => {
    button.addEventListener("click", () => {
        switch (button.classList.value) {
            case "number":
                currentValue = currentValue.concat(button.id);
                valueText.textContent = currentValue;
                value = Number(currentValue);
                break;
            case "operator":
                if (total == undefined) {
                    total = Number(currentValue);
                    totalText.textContent = value;
                } else if (operator != "") {
                    total = operate(total, value, operator);
                    totalText.textContent = total;
                } else {
                    totalText.textContent = total;
                }
                operatorText.textContent = button.id;
                operator = button.id.toString();
                currentValue = "";
                break;
            case "=":
                if (total == undefined || value == undefined ||operator == "") return;
                let newTotal = operate(total, value, operator)
                operatorText.textContent = "";
                totalText.textContent = `${total} ${operator} ${value} =`;
                valueText.textContent = newTotal;
                
                total = newTotal
                value = 0;
                operator = "";
                break;
            case ".":
                if (currentValue.includes(".")) return;
                currentValue = currentValue.concat(button.id);
                valueText.textContent = currentValue;
                break;
            case "delete":
                currentValue = currentValue.slice(0, currentValue.length - 1);
                valueText.textContent = currentValue;
                break;
            case "clear":
                total = undefined;
                value = undefined;
                operator = "";
                currentValue = "";

                totalText.textContent = "";
                valueText.textContent = "";
                operatorText.textContent = "";
                break;
            default:
                console.error("invalid button");
                break;
        }
    });
});

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 == 0) {
        alert("You cannot divide by 0...");
        return;
    }
    return num1 / num2;
}

function operate(num1, num2, operator) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            console.error("Invalid Operator");
            return "Error";
    }
}