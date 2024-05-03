# html-fund-me

This contract is a minimalistic html example of how to interact with a decentralized application through its address and ABI.

# Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you've installed it right if you can run:
    - `git --version`
- [Metamask](https://metamask.io/)
  - This is a browser extension that lets you interact with the blockchain.

# Quickstart

1. Clone the repo

```
git clone https://github.com/hadesbaker/html-fund-me.git
cd html-fund-me
```

2. Run the file.

You can usually just double click the file to "run it in the browser". Or you can right click the file in your VSCode and run "open with live server".

And you should see a small button that says "connect".

![Connect](connect.png)

Hit it, and you should see metamask pop up.

# Execute a transaction

If you want to execute a transaction follow this:

Make sure you have the following installed:

1. You'll need to open up a second terminal and run:

```
git clone https://github.com/hadesbaker/foundry-fund-me.git
cd foundry-fund-me
forge build
anvil
```

Then, in a second terminal
```
forge deploy-anvil
```

This will deploy a sample contract and start a local hardhat blockchain.

2. Update your `constants.js` with the new contract address.

In your `constants.js` file, update the variable `contractAddress` with the address of the deployed "FundMe" contract. You'll see it near the top of the hardhat output.

3. Connect your [metamask](https://metamask.io/) to your local hardhat blockchain.


