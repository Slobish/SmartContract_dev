const Web3 = require('web3');
const solc = require('solc');
const fs   = require('fs');
const Tx = require('ethereumjs-tx');
web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg'));


function callByTransaction(abi,at,options)
{

    var fileName ="./src/"+"test.sol";
    var contractName="test";
    var compiledInstance=solc.compile(fs.readFileSync(fileName).toString());
    var contractAbi = JSON.parse(compiledInstance.contracts[':'+contractName].interface);
    var bytecode = compiledInstance.contracts[':'+contractName].bytecode;

    var contractModel= web3.eth.contract(contractAbi);
    var instance = contractModel.at("0xb3ced684e72c09b66b1909424d3c99a32ca135ea");

    instance[options.function].getData(options.parameters)

    if(options.hasEvents === false){}
    if(typeof options.to === 'undefined' || typeof options.from === 'undefined' || typeof options.function === 'undefined') throw new Error("Missing parameter");
    if(typeof options.parameters === 'undefined')  throw new Error("Missing parameter");   
   
    var bytecode="0x"+json[contract].bytecode;
    var contractAbi = json[contract].abi;
    var from=web3.eth.coinbase;
    var MyContract = web3.eth.contract(abi);    
    
}

