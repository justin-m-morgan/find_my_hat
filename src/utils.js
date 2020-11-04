function randomInteger(minInclusive, maxInclusive) {
    return (
        Math.round(Math.random() * (maxInclusive - minInclusive)) + minInclusive
    )
}

module.exports = { randomInteger }
