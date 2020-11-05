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

    static randomNotAt(
        coordsToExclude,
        minHeight,
        maxHeight,
        minWidth,
        maxWidth
    ) {
        return randomCoordinateNotAt(
            coordsToExclude,
            minHeight,
            maxHeight,
            minWidth,
            maxWidth
        )
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
        return coordsAreEqual(coord1)(coord2)
    }
}

function randomCoordinate(minHeight, maxHeight, minWidth, maxWidth) {
    const row = randomInteger(minHeight, maxHeight)
    const col = randomInteger(minWidth, maxWidth)
    return new Coordinate(row, col)
}
function randomCoordinateNotAt(
    coordinates,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth
) {
    if (!Array.isArray(coordinates)) coordinates = [coordinates]
    const coordinateParams = [minHeight, maxHeight, minWidth, maxWidth]
    let potentialCoordinate = randomCoordinate(...coordinateParams)
    while (testCoordinateInSet(potentialCoordinate)(coordinates)) {
        potentialCoordinate = randomCoordinate(...coordinateParams)
    }
    return potentialCoordinate
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
        return set.some(coordsAreEqual(testCoordinate))
    }
}

function coordsAreEqual(coord1) {
    return function (coord2) {
        return coord1.row == coord2.row && coord1.col == coord2.col
    }
}

module.exports = { Coordinate }
