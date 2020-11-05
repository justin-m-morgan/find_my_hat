const { FIELD_CHARACTER, PATH_CHARACTER, HAT } = require("./constants")
const { Coordinate } = require("./Coordinate")

const defaultConfig = {
    height: 10,
    width: 10,
    startingLocation: { row: 0, col: 0 },
}

class Field {
    constructor({ height, width }) {
        this.height = height
        this.width = width
        this.field = generateNestedArray(height, width, FIELD_CHARACTER)
        this.location = new Coordinate(
            defaultConfig.startingLocation.row,
            defaultConfig.startingLocation.col
        )
        this.hatLocation = generateCoordinateNotAtStartingLocation(this)
        this.gameState = "IN_PROGRESS"

        // Initialize field

        placeCharacterAtStart(this, defaultConfig.startingLocation)
        placeHat(this)
    }
    print() {
        this.field.forEach((row) => console.log(row.join(" ")))
    }
    acceptMoveCommand(directionKey) {
        if (directionKey) {
            const direction = moveDict(directionKey)
            const delta = moveCommand(direction)
            const moveToCoords = deltaCoords(this, delta)
            moveTo(this, moveToCoords, direction)

            return `Moving ${direction}`
        } else {
            return " "
        }
    }
}

function moveTo(field, moveTo, direction) {
    const { row: newRow, col: newCol } = moveTo
    const { row: oldRow, col: oldCol } = field.location
    field.field[oldRow][oldCol] = direction
    field.field[newRow][newCol] = PATH_CHARACTER
    field.location = moveTo
    if (Coordinate.is_equal(field.location, field.hatLocation)) {
        field.gameState = "GAME_WON"
    }
}
function deltaCoords(field, delta) {
    const [dRow, dCol] = delta
    const { row, col } = field.location
    const moveTo = { row: row + dRow, col: col + dCol }
    const height = field.height
    const width = field.width
    if (moveTo.row < 0) {
        console.log("resetting")
        moveTo.row = height - 1
    } else if (moveTo.row >= height) {
        moveTo.row = 0
    }
    if (moveTo.col < 0) {
        moveTo.col = width - 1
    } else if (moveTo.col >= width) {
        console.log("moveTo")
        moveTo.col = 0
    }
    return moveTo
}

function moveDict(moveKey) {
    return { w: "⇡", s: "⇣", a: "⇠", d: "⇢" }[moveKey]
}

function moveCommand(move_symbol) {
    return {
        "⇡": [-1, 0],
        "⇣": [1, 0],
        "⇠": [0, -1],
        "⇢": [0, 1],
    }[move_symbol]
}

function placeCharacterAtStart(
    field,
    { row, col } = defaultConfig.startingLocation
) {
    field.field[row][col] = PATH_CHARACTER
}

function generateCoordinateNotAtStartingLocation(field) {
    return Coordinate.randomNotAt(
        [{ row: 0, col: 0 }],
        0,
        field.height - 1,
        0,
        field.width - 1
    )
}

function placeHat(field) {
    field.field[field.hatLocation.row][field.hatLocation.col] = HAT
}

function generateNestedArray(height, width, fillContent) {
    let array = []
    for (let row = 0; row < height; row++) {
        let newRow = Array(width).fill(fillContent)
        array.push(newRow)
    }
    return array
}

module.exports = { Field }
