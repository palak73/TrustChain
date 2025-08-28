import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";
import { abi, contractaddress ,bytecode} from "./constant.js";
// import { Contractindex } from "./script.js";

// console.log(Contractindex);

const connectbtn = document.querySelector("#connectWallet");
const EthSend = document.getElementById("confirmDonate");
const donateamt = document.getElementById("donationAmount");
const load = document.getElementById("loading");
const check = document.getElementById("check");
const conv = document.getElementById("conversion");
const loadingScreen = document.getElementById("loading-screen");
const deploy = document.getElementById("deploy");

let currRate;
let provider, signer;


const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr");
const data = await res.json();
currRate = data.ethereum.inr;
console.log(`1 ETH = ₹${data.ethereum.inr}`);
conv.innerHTML = `1 ETH = ₹${data.ethereum.inr}`;



function showToast(message) {
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toast-text");
    toastText.textContent = message; 
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 7000);
}


function getCurrentContract() {
    const index = window.ContractIndex || 0;
    return new ethers.Contract(
        contractaddress[index],
        abi,
        signer || provider // Fallback to provider if no signer
    );
}

 async function Connect() {
    console.log("Connect Button clicked");
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    else {
        showToast("No Ethereum Provider like Metamask installed");
        throw new Error("No Ethereum Provider like Metamask installed");
    }
    try {
        await provider.send("eth_requestAccounts", []);
    }
    catch (error) {
        if (error.code == 4001) {
            showToast("User Denied access");
            console.error("User Denied access");
        }
    }
    signer = provider.getSigner();
    const address = await signer.getAddress();
    connectbtn.innerHTML = "Connected!";

    // adrs.innerText=`Wallet Address: ${address}`;

window.Connect = Connect;
window.signer = signer;
window.provider = provider;

};

connectbtn.addEventListener('click',()=> Connect());
// console.log("Current index:", window.getContractIndex());
check.addEventListener('click', () => {

    const total = currRate * donateamt.value;
    conv.innerText = `${donateamt.value} ETH = ₹${total}`;

});

async function deployDonationContract() {
  if (!signer) {
    await Connect();
  }

  console.log("🚀 Deploying new Donation contract...");

  const DonationFactory = new ethers.ContractFactory(abi, bytecode, signer);
  const contract = await DonationFactory.deploy();

  console.log("⏳ Tx hash:", contract.deployTransaction.hash);

  await contract.deployed();
  console.log("✅ Contract deployed at:", contract.address);

  // Push to your global contractaddress array (so rest of your code can use it)
//   contractaddress.push(contract.address);
//   window.ContractIndex = contractaddress.length - 1; // point to latest

  showToast(`New Contract Deployed at: ${contract.address}`);
  return contract;
}

deploy.addEventListener("click", async () => {
  const deployed = await deployDonationContract();
  console.log("Now ready to donate to:", deployed.address);
});

EthSend.addEventListener('click', async () => {
    loadingScreen.style.display = "flex";
    try {
        const contract = getCurrentContract();
        const dntamt = donateamt.value;
        //  console.log(typeof dntamt);
        // Gets fresh index every time

        console.log("Current index at tx time:", window.Contractindex);
        console.log("Using address:", contractaddress[window.Contractindex]);

        const convrt = await contract.getConversionrate(ethers.utils.parseEther(dntamt));
        console.log(convrt);
        console.log(ethers.utils.formatUnits(convrt, 18));

        const tx = await contract.Fund({ value: ethers.utils.parseEther(dntamt.toString()) });
        // load.innerHTML = `Awaiting Transaction Results... Please wait...`;


        await tx.wait();
        // try {
        //     await db.collection("donations").add(donationData);
        //     showToast(`✅ Thank you! You donated ${amount} ETH to ${selectedNGO.name}`);
        //     closeModal();
        //     fetchAndRenderUserDonations(); // Update donation list
        // } catch (error) {
        //     console.error("Donation save failed:", error);
        //     showToast("❌ Donation could not be saved.");
        // }
        loadingScreen.style.display = "none";

        // load.innerHTML = `Transaction Successful ${tx.hash}`;
        load.innerHTML = `✅ Transaction Successful: <a href="https://sepolia.etherscan.io/tx/${tx.hash}" target="_blank" style="color: #4CAF50; text-decoration: underline;">View on Etherscan</a>`;


    }
    catch (err) {
        load.innerHTML = `Transaction Failed`;
        showToast("Transaction failed");
    }

    loadingScreen.style.display = "none";
    const rate = await contract.getPrice();
    console.log(rate);
    console.log(ethers.utils.formatUnits(rate, 18));



    console.log("Successful")
    // console.log(Contractindex);
    const balance = await provider.getBalance(contract.address);
    console.log(ethers.utils.formatEther(balance));



});
