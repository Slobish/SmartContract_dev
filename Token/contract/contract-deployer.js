var fs = require('fs');
var solc = require('solc');
var Web3 = require('web3');
var address = "0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c";
var balance;
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg"))

web3.eth.getBalance(address).then(function(e)
    {
        balance=e;
        console.log("El balance es de la cuenta es "+ web3.utils.fromWei(balance.toString(),'ether'));
        var source = fs.readFileSync("./contracts/Picker.sol", 'utf8');
        console.log('compiling contract...');
        var compiledContract = solc.compile(source);
        console.log('done');
        for (var contractName in compiledContract.contracts) 
        {
            var bytecode = compiledContract.contracts[contractName].bytecode;
            var abi = JSON.parse(compiledContract.contracts[contractName].interface);
        }
        

        web3.eth.estimateGas({data: '0x' + bytecode}).then(function(gasEstimate)
            {
                gasEstimate
                console.log('gasEstimate = ' + gasEstimate);
                console.log(JSON.stringify(abi, undefined, 2));
                var options={
                    data:'0x'+bytecode,
                    from: address,
                    gas: gasEstimate+20000,
                    gasPrice: '30000000000000'
                }
                var myContract = new web3.eth.Contract(abi);
                  
                myContract.deploy({
                       data:'0x'+bytecode 
                }).send({
                    from:address,
                    gas: gasEstimate+20000,
                    gasPrice:'30000000000000'
                }).then(function(newContractInstance)
                {
                    console.log(newContractInstance.options.address) 
                });
                
                
            });           
    });
    



