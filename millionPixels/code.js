const Web3 = require('web3');
const solc = require('solc');
const fs   = require('fs');

web3=new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg'));


const ownerAddress = "0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c";

var fileName ="./"+"contracts/MillionPixel.sol";
var contractName="MillionPixel";
var compiledInstance=solc.compile(fs.readFileSync(fileName).toString());
var contractAbi = compiledInstance.contracts[':'+contractName].interface;
var bytecode = compiledInstance.contracts[':'+contractName].bytecode;

options = 
  {
    from: myAddress,
    gas: 200000*2,
  }

var contractDeployer = new web3.eth.Contract(JSON.parse(contractAbi),options);

var contractInstance = contractDeployer.deploy({data:bytecode}); // if needed arguments:[ web3.utils.asciiToHex('sadas')]

web3.eth.estimateGas(contractInstance).then(console.log);

var MyContract = web3.eth.contract(contractAbi);
var contractInstance = MyContract.at(contractAddress);
var event = contractInstance.allEvents()
console.log("listening for events on ", contractAddress)
// watch for changes
event.watch(function(error, result){ //This is where events can trigger changes in UI
if (!error)
    console.log(result);
});
return contractInstance
  

  