const { Field } = require("./Field")

describe("Creating an instance", () => {
    const config = { height: 10, width: 8 }
    const field = new Field(config)

    test("should create an instance with provided height and width", () => {
        expect(field.height).toEqual(config.height)
    })
    // test("the starting location should be 0, 0", () => {
    //     expect(field.location).toEqual({ row: 0, col: 0 })
    // })
})
