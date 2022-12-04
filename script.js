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

const screenLimit = 30
let baseScreen = true
let screenCount = 0
let lastInput = workingScreen.textContent[screenCount]
let activeDecimal = false
let activeOperation = false
let activeOperators = 0

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
    if (screenCount === screenLimit) {
    }
    else if (baseScreen === true) {
        workingScreen.textContent = number
        baseScreen = false
        screenCount += 1
        activeOperation = false
    }
    else {
        workingScreen.textContent += number
        baseScreen = false
        screenCount += 1
        activeOperation = false
    }
}

function appendOperator(operator) {
    if (activeOperation || screenCount === screenLimit) {
    }
    else if (activeOperators > 3) {
    alert('Maximum of 4 active operators.')
    }
    else {
    workingScreen.textContent += operator
    baseScreen = false
    screenCount += 1
    activeOperation = true
    activeOperators += 1
    activeDecimal = false
    }
}

function allClear() {
    history.textContent = ''
    clearInput()
}

function clearInput() {
    workingScreen.textContent = '0'
    baseScreen = true
    screenCount = 0
    activeDecimal = false
    activeOperation = false
    activeOperators = 0
}

function deleteInput() {
    if (lastInput === '+' || lastInput === '-' || lastInput === '×' || lastInput === '÷') {
        activeOperation = false
        activeOperators -= 1
    }
    workingScreen.textContent = workingScreen.textContent.slice(0, -1)
    if (lastInput === '.') {
        screenCount -= 1
        activeDecimal = true
    }
}

function prevAnswer() {
    workingScreen.textContent = history.textContent
}

function appendDecimal() {
    if (activeDecimal === true || screenCount === screenLimit) {
    } else {
    workingScreen.textContent += '.'
    baseScreen = false
    screenCount += 1
    activeDecimal = true
    }
}

function keyInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendDecimal()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteInput()
    if (e.key === 'Escape') allClear()
    if (e.key === '+' || e.key === '-') appendOperator(e.key)
    if (e.key === '*') appendOperator('×')
    if (e.key === '/') appendOperator('÷')
}

function addition(arg1, arg2) {
    return(arg1 + arg2)
}

function subtraction(arg1, arg2) {
    return(arg1 - arg2)
}

function multiplication(arg1, arg2) {
    return(arg1 * arg2)
}

function division(arg1, arg2) {
    return(arg1 / arg2)
}

function evaluate() {
    let values =  workingScreen.textContent.split(/\D+/)
    let operators = workingScreen.textContent.split(/\d+/)
    let answer = parseInt(values[0])
    for (i=1; i<operators.length-1; i++) {
        if (operators[i] === '+') {
            answer = addition(answer, parseInt(values[i]))
        }
        else if (operators[i] === '-') {
            answer = subtraction(answer, parseInt(values[i]))
        }
        else if (operators[i] === '×') {
            answer = multiplication(answer, parseInt(values[i]))
        }
        else if (operators[i] === '÷') {
            answer = division(answer, parseInt(values[i]))
        }
    }
    returnResult(answer)
}

function returnResult(result) {
    history.textContent = result
    clearInput()
}
