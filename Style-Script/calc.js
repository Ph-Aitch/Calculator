const display = document.querySelector(".display")
const numbers = document.querySelectorAll(".num, .zero, .point")
const buttons = document.querySelectorAll(".clear, .sign, .percent")
const equal = document.querySelector(".equal")
const arithmatics = document.querySelectorAll(".divide, .multiply, .subtract, .add")
const mobile = document.querySelector(".container")

let x
let y
let flag = false // a flag to track some operations within the code
let operation = null

// event listenrs 
numbers.forEach(num => {
    num.addEventListener("click", (e) => {
        e.preventDefault()
        updateDisplay(num)
        coolEffect(`rgb(0, 183, 255)`)
    })

})
//clear function to backspace or clear all data
clear.addEventListener("click", (e) => {
    e.preventDefault()
    let check = clear.textContent
    if (check === "C") {
        clearData()
    } else if (check === "AC") {
        backSpace()
    }
    coolEffect(`black`)
})
// assigning event listeners and update function to each operation button
arithmatics.forEach(oper => {
    oper.addEventListener("click", (e) => {
        e.preventDefault()
        updateData(oper)
        coolEffect(`rgb(0, 255, 98)`)
    })
})
// assign operate function to equal button
equal.addEventListener("click", () => {
    operate()
    coolEffect(`rgb(0, 255, 98)`)
})

sign.addEventListener("click", () => {
    switchSign()
    coolEffect(`black`)
})
percent.addEventListener("click", () => {
    percentage()
    coolEffect(`black`)
})
// DOM event listener for keyboard keyStrokes 
document.addEventListener("keydown", keyboardInputs)

// functions 
function updateDisplay(num) { // used to update display when num is clicked
    let result = display.textContent
    const regx = /\.|^0$/
    if (!flag) {
        display.textContent = ``
        clear.textContent = `AC`
        flag = true
    }
    if (result.length < 9) {
        if (!regx.test(result) && num.textContent !== "." && num.textContent !== "0") {
            display.textContent += num.textContent
        } else if (result === "0" && num.textContent === ".") {
            result += num.textContent
            display.textContent = result
        } else if (result !== "0" && !regx.test(result)) {
            display.textContent += num.textContent
        } else if (regx.test(result) && num.textContent !== ".") {
            display.textContent += num.textContent
        }
    }
}

function updateData(oper) { // used to update data stores when an operation key is clicked
    let result = display.textContent
    flag = false
    if ((result !== "0" && result !== "0.")) {
        const arithms = Array.from(arithmatics)
        arithmatics.forEach(item => item.classList.toggle("clicked", false))
        let index = arithms.indexOf(oper)
        if (!x) {
            x = Number(result)
            operation = arithms[index]
        } else {
            y = Number(result)
            equal.click()
        }
        operation = arithms[index]
        oper.classList.toggle("clicked")
    }
}

function clearData() { // reset calc to initial state
    x = undefined
    y = undefined
    flag = false
    operation = null
    display.textContent = `0`
    arithmatics.forEach(item => item.classList.toggle("clicked", false))
}

function backSpace() { // backspace the display
    let result = display.textContent
    result = result.slice(0, result.length - 1)
    display.textContent = result
    if (display.textContent === ``) {
        clear.textContent = `C`
        display.textContent = `0`
        flag = false
    }
} // here it bugged from me , eg. when a number is represented in exponential form it backspaces and deform the number, i didn't bother fixing it ri8 now, cuz i gtg to sleep cuz work early morning yay!, sry.

function switchSign() { // this switch the sign of the number displayed
    const regs = /-/
    let result = display.textContent
    if (parseInt(result) !== 0) {
        if (regs.test(result)) {
            result = result.slice(1)
            display.textContent = result
        } else {
            display.textContent = "-" + result
        }
    }
}

function percentage() { // simply divides by 100
    let result = display.textContent
    if (result !== "0" && result !== "0.") {
        result = (parseFloat(result) / 100).toPrecision(3)
        if (result.length < 11) {
            display.textContent = result
        } else {
            display.textContent = result.toPrecision(4)
        }
    }
}

function operate() { // the equal function
    function restrains(x) { // contains number of digits displayed not to deform the container by overflowing
        if (String(x).length < 10) {
            display.textContent = x
        } else {
            display.textContent = x.toExponential(3)
        }
        y = 0
    }
    function calc() { // checks for which operation to be done using the pressed operation button
        if (operation.id === "add") {
            x = x + y
            restrains(x)
        }
        if (operation.id === "multiply") {
            x = x * y
            restrains(x)
        }
        if (operation.id === "subtract") {
            x = x - y
            restrains(x)
        }
        if (operation.id === "divide") {
            if (y === 0) {
                display.textContent = `Gottcha!`
                clear.textContent = `C`
            } else {
                x = x / y
                restrains(x)
            }
        }
    }
    try { // preform operation upon data store , throws an error if no operation is selected 
        y = Number(display.textContent)
        flag = false
        clear.textContent = `C`
        arithmatics.forEach(oper => oper.classList.toggle("clicked", false))
        if (operation) {
            calc()
        } else {
            throw new Error("you have to preform an operation");
        }
    } catch (err) {
        console.error(err);
    }
}

function coolEffect(color) { // some css effects 
    mobile.style.boxShadow = `0px 0px 115px 45px ${color}`
    mobile.style.border = `5px solid ${color}`
    setTimeout(() => {
        mobile.style.boxShadow = ``
        mobile.style.border = ``
    }, 300)
}

function keyboardInputs(e) { // keyboard event for easier functionality , didn't add buttons for switching signs and percent cuz no clear key for both 
    let num = Array.from(numbers)
    let numpad = Array.from(arithmatics)
    console.log(`key : ${e.key}`)
    switch (e.key) {
        case `0`:
            num.find(item => item.id === "zero").click()
            break;
        case `1`:
            num.find(item => item.id === "one").click()
            break;
        case `2`:
            num.find(item => item.id === "two").click()
            break;
        case `3`:
            num.find(item => item.id === "three").click()
            break;
        case `4`:
            num.find(item => item.id === "four").click()
            break;
        case `5`:
            num.find(item => item.id === "five").click()
            break;
        case `6`:
            num.find(item => item.id === "six").click()
            break;
        case `7`:
            num.find(item => item.id === "seven").click()
            break;
        case `8`:
            num.find(item => item.id === "eight").click()
            break;
        case `9`:
            num.find(item => item.id === "nine").click()
            break;
        case `.`:
            num.find(item => item.id === "point").click()
            break;
        case `/`:
        case 'NumpadDivide':
            numpad.find(item => item.id === "divide").click()
            break;
        case `*`:
        case 'NumpadMultiply':
            numpad.find(item => item.id === "multiply").click()
            break;
        case `-`:
        case `NumpadSubtract`:
            numpad.find(item => item.id === "subtract").click()
            break;
        case `+`:
        case `NumpadAdd`:
            numpad.find(item => item.id === "add").click()
            break;
        case `Enter`:
            equal.click()
            break
        case `Backspace`:
            clear.click()
            break
        default:
            break;
    }
}