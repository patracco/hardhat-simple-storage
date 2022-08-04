const { task } = require("hardhat/config")

// the task function has a name and description, https://hardhat.org/hardhat-runner/docs/advanced/create-task
task("block-number", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}
