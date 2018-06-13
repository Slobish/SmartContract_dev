const Web3 = require('web3');
const solc = require('solc');
const fs   = require('fs');
const Tx = require('ethereumjs-tx');
web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg'));

var fileName ="./"+"contract.sol";
var contractName="sayer";
var compiledInstance=solc.compile(fs.readFileSync(fileName).toString());
var contractAbi = compiledInstance.contracts[':'+contractName].interface;
var bytecode = compiledInstance.contracts[':'+contractName].bytecode;

var address1 = "0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c";
var privateKey1 = new Buffer.from("5f00744254d7963a4b50dd4abd867b4838ddeb32d6b24327065fc4484a9eeaff", "hex");

var address2 = "0x47014cae621dcb39c448c381e9e1a5603182a9e9";
var privateKey2 = new Buffer.from("9216e258d39955a2eb8d19ff67b260827852891454cbb9e0c012620c6ed803f9", "hex");

var receipt;

web3.eth.getBlockNumber().then((bn) => {
    if(bn != undefined) console.log("Connected to ropsten..");
});
var gp = web3.eth.getGasPrice().then((gasPrice) => {
    console.log("Gas price: " + gasPrice);
    return web3.utils.toHex(gasPrice);
});
const gasLimitHex = web3.utils.toHex(3000000);
gp.then((gasPriceHex) => {
    var accounts = [address1, address2];
    
           
            web3.eth.getTransactionCount(address1).then((nonce) => {
                console.log("TX nonce " + nonce);
                console.log("Gas Price : " + parseInt(gasPriceHex));
                console.log("Gas Limit : " + parseInt(gasLimitHex));
                
                var rawTx = {
                    nonce: nonce,
                    gasPrice: gasPriceHex,
                    gasLimit: gasLimitHex,
                    data: "0x" +bytecode
                };
                
                var tx = new Tx(rawTx);
                tx.sign(privateKey1);
                var serializedTx = tx.serialize();
                web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', function(e){e.log;});

                
            });
        });
    