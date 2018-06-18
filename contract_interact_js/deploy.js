const Web3 = require('web3');
const solc = require('solc');
const fs   = require('fs');

web3=new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg'));


const ownerAddress = "0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c";

var fileName ="./"+"contract.sol";
var contractName="sayer";
var compiledInstance=solc.compile(fs.readFileSync(fileName).toString());
var contractAbi = compiledInstance.contracts[':'+contractName].interface;
var bytecode = compiledInstance.contracts[':'+contractName].bytecode;

options = 
  {
    from: myAddress,
    gas: 200000*2,
  }
var contractDeployer = new web3.eth.Contract(JSON.parse(contractAbi),options);

var contractInstance = contractDeployer.deploy({data:bytecode} ); // if needed arguments:[ web3.utils.asciiToHex('sadas')]

web3.eth.estimateGas(contractInstance).then(console.log);



/*

const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

// Connect to local Ethereum node
let web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// Compile the source code
const input = fs.readFileSync('AdvancedTokenScratch.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':AdvancedTokenScratch'].bytecode;
const abi = JSON.parse(output.contracts[':AdvancedTokenScratch'].interface);

let _contract;
let _deployedContract;
let _myAddress;
const _destAddress = "0x5c3453c5189eda3adde88bf56b866644673c0f9a";
const password = "pepe";

web3.eth.getCoinbase().then(myAddress => {
   console.log("[INFO] Address", myAddress);
   _myAddress = myAddress
   _contract = new web3.eth.Contract(abi, {
       from: myAddress,
       gas: 200000*2,
   }).deploy({
       data: '0x' + bytecode
   });
   _contract.estimateGas().then( gas => {
       console.log("[INFO] Gas estimate for deploying contract:",gas);
   });
   //web3.eth.personal.unlockAccount(myAddress, password).then(res => {
       console.log("[INFO] Account unlocked correctly");
       _contract.send()
       .on('confirmation', (confirmationNumber, receipt) =>{
           console.log('[INFO] Confirmation:', confirmationNumber);
       })
       .on('receipt', receipt => {
           console.log('[INFO] Contract address:', receipt.contractAddress);
           _deployedContract = new web3.eth.Contract(abi, receipt.contractAddress);
           startWatchingForEvents();
           sendTransaction();
       })
       .on('error', console.error);
   //}).catch((err) =>{
        console.log("[ERROR] While trying to unlock the account", err)
   //});
}).catch(() =>{
    console.log("[ERROR] While trying to get address")
});

function startWatchingForEvents() {
   _deployedContract.events.Transfer({}, (error, event) =>  {
       if(error){ console.error(error); return; }
       console.log("[Event] Transfer of", event.returnValues.amount,"from", event.returnValues.from, "to", event.returnValues.to);
   });
}

function sendTransaction() {
   transfer(_myAddress, _destAddress, 10).then(() => {
       getBalance(_destAddress).then(balance => {
           console.log("[INFO] New balance of partner:", balance)
           setTimeout(sendTransaction, 3000);
       });
   });
}

function getBalance(ofAddress) {
   return _deployedContract.methods.balances(ofAddress).call({
       from: _myAddress
   });
}

function transfer(fromAddress, toAddress, amountOfTokens) {
   console.log("[INFO] Making a transfer of", amountOfTokens,"tokens from", fromAddress, "to", toAddress, "...");
   return _deployedContract.methods.transfer(toAddress, amountOfTokens).send({
       from: fromAddress
   });
}*/