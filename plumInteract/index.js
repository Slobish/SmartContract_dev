const Web3 = require('web3');
const fs = require('fs')
web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg'));

function  callByTransaction (abi,options)
{
    if(options.hasEvents !== 'undefined')
    {
        if(options.hasEvents === true || options.hasEvents === 'true')
        {
            var eventListener = getEventInstance(abi,options);
        }
    }
    if(typeof options.at === 'undefined' || typeof options.from === 'undefined' || typeof options.function === 'undefined') throw new Error("Missing parameter");
    
    var instance = getContractInstance(abi,options)
    var bytecode = getTransactionBytecode(instance,options);

    if(options.isUnlocked==true) web3.eth.sendTransaction({from:options.from,to:options.at,value:options.value,data:bytecode});
    else 
    {
        const Tx = require('ethereumjs-tx');
        var rawTx = { 
        nonce: web3.eth.getTransactionCount(options.from),
        gasPrice: 100000000,
        gasLimit: 1000000,
        to:options.at,
        data: bytecode,
        value: options.value
        };   
        var tx = new Tx(rawTx);
        password = new Buffer.from(options.pass, "hex");
        tx.sign(password);
        var serializedTx = tx.serialize();
        receipt = web3.eth.sendRawTransaction("0x"+serializedTx.toString('hex'),function(err,hash){if(err)console.log(err); else console.log(hash)})   
    }
}
function deployContract (abi,options)
{
    
}
function getContractInstance (abi,options)
{   
    if(!typeof abi === 'object') var abi = JSON.parse(abi);
    var instance = web3.eth.contract(abi).at(options.at);
    return instance;
}

function getTransactionBytecode (instance,options)
{
    var p = options.parameters;
    
    var bytecode = instance[options.function].getData(p[0],p[1],p[2]); // AMOUNT OF ARGUMENTS MUST MATCH WITH FUNCTION
    
    return bytecode;
}

function  getEventInstance (abi,options)
{    
    var instance = getContractInstance(abi,options)
    var event = instance.allEvents()
    
    // watch for changes
    event.watch(function(error, result)
    {
    if (!error)
        console.log(result);
    });
    
}

function getAbi (filename,name)
{
    const solc = require('solc');
    var fileName = filename;
    var contractName = name;
    var compiledInstance = solc.compile(fs.readFileSync(fileName).toString());
    var abi = JSON.parse(compiledInstance.contracts[':'+contractName].interface);
    var bytecode = compiledInstance.contracts[':'+contractName].bytecode;
    return abi;
}




options = {
    from:"0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c",
    at:  "0xbd1c30a4da8a4a07bb8c19e6e2692f18cbe930f6",
    pass:"5f00744254d7963a4b50dd4abd867b4838ddeb32d6b24327065fc4484a9eeaff",
    value:0,
    hasEvents:true,
    function:"setManuFranco",
    parameters:[2,2,2]
}

abi =getAbi("./test.sol","test");

callByTransaction(abi,options);