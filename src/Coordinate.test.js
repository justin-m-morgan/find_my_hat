const { Coordinate } = require("./Coordinate")

test("a coordinate should have a row and col", () => {
    const row = 1
    const col = 2
    const coord = new Coordinate(row, col)
    expect(coord.row).toBe(row)
    expect(coord.col).toBe(col)
})

test("a coordinate set should be an object with row and col properties", () => {
    const row = 1
    const col = 1
    const coord = new Coordinate(row, col)
    expect(coord.set).toEqual({ row, col })
})

test("static method should generate a random coordinate within the provided bounds", () => {
    const minWidth = 0
    const maxWidth = 10
    const minHeight = 0
    const maxHeight = 12
    const coord = Coordinate.random(minHeight, maxHeight, minWidth, maxWidth)
    expect(withinRange(minHeight, maxHeight)(coord.row)).toBe(true)
    expect(withinRange(minWidth, maxWidth)(coord.col)).toBe(true)
})

test("static method should test for equal coordinates", () => {
    const coord1 = new Coordinate(1, 2)
    const coord2 = new Coordinate(1, 2)
    const coord3 = new Coordinate(2, 1)
    expect(Coordinate.is_equal(coord1, coord2)).toBe(true)
    expect(Coordinate.is_equal(coord1, coord3)).toBe(false)
})

function withinRange(minInclusive, maxInclusive) {
    return function (value) {
        return minInclusive <= value && value <= maxInclusive
    }
}
