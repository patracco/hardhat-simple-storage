## Steps

1. create package with yarn init
2. yarn add --dev hardhat
3. yarn hardhat
4. yarn add --dev prettier prettier-plugin-solidity + .prettierrc
5. yarn add --dev dotenv
6. yarn hardhat compile to create "artifacts

# Deploy on Hardhat Network no verification

7. yarn hardhat run scripts/deploy.js (no Etherscan verification)
8. added goerli to hardhat.config.js

# Deploy on a testnet + Verification

9. yarn hardhat run scripts/deploy.js --network goerli (Etherscan verification, if it does not work, delete "artifacts" and "cache" and run again)
10. verify contract with Etherscan plugin, yarn add --dev @nomiclabs/hardhat-etherscan. Use yarn hardhat and you'll find a "verify" command

# Custom tasks

tasks are actions that can be performed with yarn hardhat, such as "yarn hardhat check". When you create a new task, it will be added to the list. Tasks are used for specific situations, but most of the time I should use scripts. Tasks are better for plugins.

11. Create folder tasks and custom task block-number.js
12. add task to hardhat.config.js with require("./tasks/block-number")
13. i.e. use yarn hardhat block-number --network goerli or yarn hardhat block-number --network hardhat

# Network on localhost

14. run yarn hardhat node

# Deploy on localhost for quick testing

15. yarn hardhat run scripts/deploy.js --network localhost

## Tests - super important

16. Use describe() and inside of which go:

-   beforeEach("what to do before each test"). Before each test we want to deploy our contract, then one or more tests:
-   it("this is a test")
-   it("this is a test")
-   it("this is a test")

17. yarn hardhat test
18. to only run a specific test, use yarn hardhat test --grep keywordhere, i.e. yarn hardhat test --grep Should

## Gas reporter - automatically added to test reports with yarn hardhat test

https://github.com/cgewecke/eth-gas-reporter

19. yarn add hardhat-gas-reporter --dev
20. added to hardhat.config.js
21. added coinmarketcap api to add USD conversion in gas-report.txt
22. added token to see how much it would cost on different networks/blockchains (Ethereum, Binance, Polygon etc.)

## Solidity Coverage - tells you what lines of the contracts are not covered by the tests

23. yarn add --dev solidity-coverage
24. added to hardhat.config.js
25. yarn hardhat coverage

## Waffle - advance testing
