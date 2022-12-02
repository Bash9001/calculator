const workingScreen = document.getElementById('workingScreen')
const history = document.getElementById('history')
const equalsBtn = document.getElementById('equals')
const decimalBtn = document.getElementById('decimal')
const answerBtn = document.getElementById('prevAns')
const deleteBtn = document.getElementById('delete')
const clearBtn = document.getElementById('clear')
const allClearBtn = document.getElementById('allClear')
const numberBtn = document.getElementsByClassName('number')
const operatorBtn = document.getElementsByClassName('operator')

const numberBtnArray = Array.from(numberBtn)
const operatorBtnArray = Array.from(operatorBtn)
const numRegEx = /\d+/
const operatorRegEx = /\÷\×\-\+/;

window.addEventListener('keydown', keyInput)
equalsBtn.addEventListener('click', evaluate)
decimalBtn.addEventListener('click', appendDecimal)
answerBtn.addEventListener('click', prevAnswer)
deleteBtn.addEventListener('click', deleteInput)
clearBtn.addEventListener('click', clearInput)
allClearBtn.addEventListener('click', allClear)

numberBtnArray.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent)))

operatorBtnArray.forEach((button) =>
    button.addEventListener('click', () => appendOperator(button.textContent)))

function appendNumber(number) {
    if (workingScreen.textContent === '0') {
        workingScreen.textContent = number
    } else {
        workingScreen.textContent += number
    }
}

function appendOperator(operator) {
    if (workingScreen.textContent.includes('÷'||'×'||'-'||'+')) {
    } else {
    workingScreen.textContent += operator
    }
}

function allClear() {
    workingScreen.textContent = '0'
    history.textContent = ''
}

function clearInput() {
    workingScreen.textContent = '0'
}

function deleteInput() {
    workingScreen.textContent[-1] = ''
}

function prevAnswer() {
    workingScreen.textContent = history.textContent
}

function appendDecimal() {
    if (workingScreen.textContent[-1].match(/d/) && !(workingScreen.textContent.includes('.'))) {
        workingScreen.textContent += '.'
    } else {
    }
    // if (workingScreen.textContent.includes('.')) {
    //     workingScreen.textContent
    // } else {
    //     workingScreen.textContent += '.'
    // }
}

function evaluate() {
    workingScreen.textContent
    resultReturn(answer)
}

function resultReturn(result) {
    history.textContent = result
    workingScreen.textContent = '0'
}

function keyInput() {

}
