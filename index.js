const fs = require("fs")
const prompt = require("prompt-sync")({ sigint: true })
const { Field } = require("./src/Field")

let field = new Field({ height: 20, width: 20 })
field.print()

function gameHeader() {
    console.log("========================")
    console.log("Find your hat!")
    console.log(" ")
}

function gamefooter() {
    console.log(" ")
    console.log("______________")
}

function gameDisplay(field) {
    gameHeader()
    field.print()
    gamefooter()
}

function processInput(allowableCharacters, input) {
    if (input.length > 1) return ""
    if (allowableCharacters.includes(input)) return input
    return false
}
{
    const field = new Field({ height: 10, width: 10 })
    let gameStillGoing = true
    while (gameStillGoing) {
        console.clear()
        gameDisplay(field)

        const input = prompt(
            "Which way would you like to move (⇡: w  ⇣: s  ⇠: a  ⇢: d)?"
        )
        const processedInput = processInput(["w", "s", "a", "d"], input)
        const result = field.acceptMoveCommand(processedInput)
        if (field.gameOver) gameStillGoing = false
        console.log(" ")
        console.log(result)
    }
}
