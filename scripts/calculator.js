function start() {
    
    const numberButtons = document.querySelectorAll('.number-button');
    const operatorButtons = document.querySelectorAll('.operator-button');
    const equalButton = document.querySelector('#equal-button');
    const clearButton = document.querySelector('#clear-button');
    
    let display = document.querySelector('#calculator-main-display');
    let secondaryDisplay = document.querySelector('#calculator-secondary-display');

    var operator;
    var calcDone = false;

    function displayValue(e) {

        let newValue = e.target.innerText;

        if (calcDone) {
            secondaryDisplay.innerText = display.innerText;
            display.innerText = '';
        }

        calcDone = false;
        
        if (display.innerText.includes('.')) {
            if (newValue != '.') {
                display.innerText += newValue;
            } 

        } else {
            if (display.innerText === '0' && newValue != '.') {
                display.innerText = newValue;

            } else {
                display.innerText += newValue;
            }
        }
    }

    function getSecondNumber(e) {
        operator = e.target.innerText;
        secondaryDisplay.innerText = display.innerText;
        display.innerText = 0;
    }

    function performOperation() {
        //get second display number (first num)
        console.log(display.innerText + secondaryDisplay.innerText)
        if (display.innerText != null && secondaryDisplay.innerText != '---') {
            a = parseFloat(secondaryDisplay.innerText);
            b = parseFloat(display.innerText);
    
            //perform operation
            var operators = {
                '+': function(a, b) {return a + b},
                '-': function(a, b) {return a - b},
                '÷': function(a, b) {return a / b},
                '×': function(a, b) {return a * b}
            }
    
            secondaryDisplay.innerText = a + operator + b;
            display.innerText = operators[operator](a, b);
    
            calcDone = true;
        }
    }

    numberButtons.forEach((numberButton) => {
        numberButton.addEventListener('click', displayValue);
    })

    operatorButtons.forEach((operatorButton) => {
        if (operatorButton.id != 'equal-button') {
            operatorButton.addEventListener('click', getSecondNumber)
        }
    })

    equalButton.addEventListener('click', performOperation)

    function clearDisplay() {
        display.innerText = 0;
    }

    clearButton.addEventListener('click', clearDisplay);
}

start();