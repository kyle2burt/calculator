const allButtons = document.querySelectorAll(".keypad button");
const valueText = document.querySelector("#value");
const operatorText = document.querySelector("#operator");
const totalText = document.querySelector("#total");

let currentValue = "";
let total = 0, value = 0, operator = "";

allButtons.forEach((button) => {
    button.addEventListener("click", () => {
        switch (button.classList.value) {
            case "number":
                currentValue = currentValue.concat(button.id);
                valueText.textContent = currentValue;
                value = Number(currentValue);
                break;
            case "operator":
                if (total == 0) {
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
                let newTotal = operate(total, value, operator)
                operatorText.textContent = "";
                totalText.textContent = `${total} ${operator} ${value} =`;
                valueText.textContent = newTotal;
                
                total = newTotal
                value = 0;
                operator = "";
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