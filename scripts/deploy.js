const { ethers, run, network } = require("hardhat")
require("dotenv").config()

async function main() {
    // with Hardhat, we don't need to add RPC URL nor provider and private key, like we did using Ganache because it has a built-in Hardhat Network
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying, please wait...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed contract to : ${simpleStorage.address}`)

    // what happens when we deploy to our hardhat network (local, not real, not live)? We don't need to verify on Etherscan if we deploy to our local network
    // if the network is goerli (chainId == 5) and the Etherscan API exists then go ahead with the verification
    if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        // good practice is to wait some time before a few blocks (6) are mined before we verify
        // https://docs.ethers.io/v5/api/contract/contract/#Contract--properties
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    // Update the current value
    const transactionResponse = await simpleStorage.store(9)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)
}

// on Etherscan you can verify your contract ("Verify and Publish"). However, with the following code you can verify on the fly using the Etherscan plugin
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
