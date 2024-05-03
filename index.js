import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const balanceButton = document.getElementById("balanceButton")
const ownerButton = document.getElementById("ownerButton")
const contractAddressButton = document.getElementById("contractAddressButton")

const fundButton = document.getElementById("fundButton")
const withdrawButton = document.getElementById("withdrawButton")

const addressButton = document.getElementById("addressButton")
const funderButton = document.getElementById("funderButton")

connectButton.onclick = connect
balanceButton.onclick = getBalance
ownerButton.onclick = getOwner
contractAddressButton.onclick = getContractAddress

fundButton.onclick = fund
withdrawButton.onclick = withdraw

addressButton.onclick = getAddressToAmountFunded
funderButton.onclick = getFunder

document.getElementById("addressButton").onclick = getAddressToAmountFunded
document.getElementById("funderButton").onclick = getFunder

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" })
    } catch (error) {
      console.log(error)
    }

    connectButton.innerHTML = "connected"
    const accounts = await ethereum.request({ method: "eth_accounts" })
    console.log(accounts)
  } else {
    connectButton.innerHTML = "Please install MetaMask"
  }
}

async function withdraw() {
  console.log(`Withdrawing...`)
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const transactionResponse = await contract.withdraw()
      await listenForTransactionMine(transactionResponse, provider)
      // await transactionResponse.wait(1)
    } catch (error) {
      console.log(error)
    }
  } else {
    withdrawButton.innerHTML = "Please install MetaMask"
  }
}

async function fund() {
  const ethAmount = document.getElementById("ethAmount").value
  console.log(`Funding with ${ethAmount}...`)

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)

    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      })
      await listenForTransactionMine(transactionResponse, provider)
    } catch (error) {
      console.log(error)
    }
  } else {
    fundButton.innerHTML = "Please install MetaMask"
  }
}

async function getAddressToAmountFunded() {
  const addressToCheck = document.getElementById("addressInput").value

  if (!addressToCheck) {
    console.log("Please enter an address to check.")
    return
  }

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)

    try {
      const amountFunded = await contract.getAddressToAmountFunded(
        addressToCheck
      )
      console.log(
        `Amount funded by ${addressToCheck}: ${ethers.utils
          .formatEther(amountFunded)
          .toString()} ether`
      )
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log("Please install MetaMask.")
  }
}

async function getFunder() {
  const indexToCheck = document.getElementById("indexInput").value

  if (!indexToCheck) {
    console.log("Please enter an index to reveal an address.")
    return
  }

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)

    try {
      const addressReturned = await contract.getFunder(indexToCheck)
      console.log(`The account ${addressReturned}, is index ${indexToCheck}`)
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log("Please install MetaMask.")
  }
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    try {
      const balance = await provider.getBalance(contractAddress)
      console.log(
        `This contract's balance: ${ethers.utils.formatEther(balance)}`
      )
    } catch (error) {
      console.log(error)
    }
  } else {
    balanceButton.innerHTML = "Please install MetaMask"
  }
}

async function getOwner() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const owner = await contract.getOwner()
      console.log(`The owner of this contract: ${owner}`)
    } catch (error) {
      console.log(error)
    }
  } else {
    ownerButton.innerHTML = "Please install MetaMask"
  }
}

async function getContractAddress() {
  if (typeof window.ethereum != "undefined") {
    try {
      console.log(`The contract's address is: ${contractAddress}`)
    } catch (e) {
      console.log(e)
    }
  } else {
    contractAddressButton.innerHTML = "Please install MetaMask"
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`)
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmations. `
      )
      resolve()
    })
  })
}
