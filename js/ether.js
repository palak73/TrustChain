import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";
import { abi, contractaddress } from "./constant.js";
// import { Contractindex } from "./script.js";

// console.log(Contractindex);


const connectbtn = document.querySelector("#connectWallet");
const EthSend = document.getElementById("confirmDonate");
const donateamt = document.getElementById("donationAmount");
const load = document.getElementById("loading");

let provider, signer;


function getCurrentContract() {
    const index = window.ContractIndex || 0;
    return new ethers.Contract(
        contractaddress[index],
        abi,
        signer || provider // Fallback to provider if no signer
    );
}

connectbtn.addEventListener('click', async () => {
    console.log("Connect Button clicked");
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    else {
        alert("No Ethereum Provider like Metamask installed");
        throw new Error("No Ethereum Provider like Metamask installed");
    }
    try {
        await provider.send("eth_requestAccounts", []);
    }
    catch (error) {
        if (error.code == 4001){
            alert("User Denied access");
            console.error("User Denied access");
        }
    }
    signer = provider.getSigner();
    const address = await signer.getAddress();
    connectbtn.innerHTML = "Connected!";

    // adrs.innerText=`Wallet Address: ${address}`;

});


// console.log("Current index:", window.getContractIndex());


EthSend.addEventListener('click', async () => {
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
    load.textContent=`Awaiting Transaction Results... Please wait...`;
    await tx.wait();
    load.textContent=`Transaction Successful`;

    const rate=await contract.getPrice();
    console.log(rate);
    console.log(ethers.utils.formatUnits(rate, 18));



    console.log("Successful")
    // console.log(Contractindex);
    const balance = await provider.getBalance(contract.address);
    console.log(ethers.utils.formatEther(balance));



});