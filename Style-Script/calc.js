const display = document.querySelector(".display")
const numbers = document.querySelectorAll(".num, .zero, .point")
const buttons = document.querySelectorAll(".clear, .sign, .percent")
const equal = document.querySelector(".equal")
const arithmatics = document.querySelectorAll(".divide, .multiply, .subtract, .add")
const mobile = document.querySelector(".container")

let x
let y
let flag = false
let operation = null
let active = Array.from(arithmatics).some(arithm => arithm.classList.contains("clicked"))

// event listenrs 
numbers.forEach(num => {
    num.addEventListener("click", (e) => {
        e.preventDefault()
        updateDisplay(num)
        coolEffect(`rgb(0, 183, 255)`)
    })

})

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

arithmatics.forEach(oper => {
    oper.addEventListener("mousedown", (e)=>{
        e.preventDefault()
        updateData(oper)
        coolEffect(`rgb(0, 255, 98)`)
    })
})

equal.addEventListener("click", ()=>{
    operate()
    coolEffect(`rgb(0, 255, 98)`)
})
sign.addEventListener("click", ()=>{
    switchSign()
    coolEffect(`black`)
})
percent.addEventListener("click", ()=>{
    percentage()
    coolEffect(`black`)
})

// functions 
function updateDisplay(num) {
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

function updateData(oper) {
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

function clearData() {
    x = undefined
    y = undefined
    flag = false
    operation = null
    display.textContent = `0`
    arithmatics.forEach(item => item.classList.toggle("clicked", false))
}

function backSpace() {
    let result = display.textContent
    result = result.slice(0, result.length - 1)
    display.textContent = result
    if (display.textContent === ``) {
        clear.textContent = `C`
        display.textContent = `0`
        flag = false
    }
}

function switchSign() {
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

function percentage() {
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

function operate() {
    function restrains(x) {
        if (String(x).length < 10) {
            display.textContent = x
        } else {
            display.textContent = x.toExponential(3)
        }
        y = 0
    }
    function calc() {
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
    try {
        y = Number(display.textContent)
        flag = false
        clear.textContent = `C`
        arithmatics.forEach(oper=> oper.classList.toggle("clicked",false))
        if (operation) {
            calc()
        } else {
            throw new Error("you have to preform an operation");
        }
    } catch (err) {
        console.error(err);
    }
}

function coolEffect(color) {
    mobile.style.boxShadow = `0px 0px 115px 45px ${color}`
    mobile.style.border = `5px solid ${color}`
    setTimeout(()=> {
        mobile.style.boxShadow = ``
        mobile.style.border = ``
    },300)
}

