const { randomInteger } = require("./utils")

class Coordinate {
    constructor(row, col) {
        this.row = row
        this.col = col
    }

    get set() {
        return { row: this.row, col: this.col }
    }

    static random(minHeight, maxHeight, minWidth, maxWidth) {
        return randomCoordinate(minHeight, maxHeight, minWidth, maxWidth)
    }

    static xRandomCoordinates(
        minHeight,
        maxHeight,
        minWidth,
        maxWidth,
        numberOfCoordinates
    ) {
        return generateXUniqueCoordinates(
            minHeight,
            maxHeight,
            minWidth,
            maxWidth,
            numberOfCoordinates
        )
    }

    static is_equal(coord1, coord2) {
        return coord1.row == coord2.row && coord1.col == coord2.col
    }
}

function randomCoordinate(minHeight, maxHeight, minWidth, maxWidth) {
    const row = randomInteger(minHeight, maxHeight)
    const col = randomInteger(minWidth, maxWidth)
    return new Coordinate(row, col)
}

function generateXUniqueCoordinates(
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    numberOfCoordinates
) {
    let coordinateSet = []
    while (coordinateSet.length <= numberOfCoordinates) {
        let coordinate = randomCoordinate(
            minHeight,
            maxHeight,
            minWidth,
            maxWidth
        )

        if (!testCoordinateInSet(coordinate)(coordinateSet))
            coordinateSet.push(coordinate)
    }
    return coordinateSet
}
function testCoordinateInSet(testCoordinate) {
    return function (set) {
        return set.some(
            (inSet) =>
                inSet[0] == testCoordinate[0] && inSet[1] == testCoordinate[1]
        )
    }
}

module.exports = { Coordinate }
