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

var contractDeployer = new web3.eth.Contract(JSON.parse(contractAbi));

var contractInstance = contractDeployer.deploy({data:bytecode} ); // if needed arguments:[ web3.utils.asciiToHex('sadas')]
web3.eth.estimateGas(contractInstance).then(console.log);
/*
web3.eth.estimateGas(contractInstance).then((estimatedGas)=>{
    console.log("por mandar en send");
    contractInstance.send({from:ownerAddress,gas:estimatedGas+100000 }).then(console.log("termine"));
});
 */

/*


	{
		"constant": true,
		"inputs": [],
		"name": "say",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	}
];
var contractAddress ='0x47014cae621dcb39c448c381e9e1a5603182a9e9';
var options = {
        from: ownerAddress,
        gas: 4000000,
        gasPrice: '30000000000000'
        };

const contractCode = "0x608060405234801561001057600080fd5b5061013f806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063954ab4b214610046575b600080fd5b34801561005257600080fd5b5061005b6100d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009b578082015181840152602081019050610080565b50505050905090810190601f1680156100c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60606040805190810160405280600481526020017f74686973000000000000000000000000000000000000000000000000000000008152509050905600a165627a7a723058207e5d5e197b09a8bbbd7ef8d8569954c08fc3190a5493a457edc45ffd44b621b70029";

var sayerContract = new web3.eth.Contract(contractAbi);
var sayer = sayerContract.deploy(
   {
     from: '0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c', 
     data: '', 
     gas: '4700000'
   });
   sayer.then(function(e){console.log("Deployado, address"+e.address)});


const MyContract = new web3.eth.Contract(contractAbi,contractAddress,options);
MyContract.methods.say().call().then((result) =>{
console.log(result);
});

/*
var deployedContract=MyContract.deploy({
  data: contractCode,
})
.send()
.then((instance) => {
  console.log(deployedContract=instance);
})
.catch(function (e){console.log("error")});

deployedContract.then(console.log)

*/