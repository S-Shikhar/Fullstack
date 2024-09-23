const display = document.querySelector('#display');
const keys = document.querySelector('.calculator-keys');
let firstValue = '';
let operator = '';
let secondValue = '';
let result = '';

keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case 'C':
            display.value = '0';
            firstValue = '';
            secondValue = '';
            operator = '';
            result = '';
            break;
        case '±':
            display.value = (parseFloat(display.value) * -1).toString();
            break;
        case '%':
            display.value = (parseFloat(display.value) / 100).toString();
            break;
        case '=':
            if (firstValue && operator) {
                secondValue = display.value;
                result = calculate(firstValue, operator, secondValue);
                display.value = result;
                firstValue = result;
                operator = '';
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            firstValue = display.value;
            operator = value;
            display.value = '';
            break;
        default:
            if (display.value === '0') {
                display.value = value;
            } else {
                display.value += value;
            }
            break;
    }
});

function calculate(first, operator, second) {
    first = parseFloat(first);
    second = parseFloat(second);

    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '*') return first * second;
    if (operator === '/') return first / second;
}
