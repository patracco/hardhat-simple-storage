const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    // Test if the favourite number is set to 0 at start
    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        // we can either use assert or expect, we mostly use assert
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    // Extra - this is not in the video
    it("Should work correctly with the people struct and array", async function () {
        const expectedPersonName = "Pat"
        const expectedFavoriteNumber = "7"
        const transactionResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedFavoriteNumber
        )
        await transactionResponse.wait(1)
        const { favoriteNumber, name } = await simpleStorage.people(0)
        // We could also do it like this
        // const person = await simpleStorage.people(0)
        // const favNumber = person.favoriteNumber
        // const pName = person.name

        assert.equal(name, expectedPersonName)
        assert.equal(favoriteNumber, expectedFavoriteNumber)
    })
})
