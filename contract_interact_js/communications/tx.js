var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg'));
var privateKey1;

if (process.argv[2]== "fran")
{
    var address2 = "0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c";    
    var address1 = "0x031E5c3f81B599A1fA39d7CF2c894DDE59eaB968";
    privateKey1 = new Buffer.from("2bb81f65d18350d4ec288e06a7aa81baf283c2a5543f0edbb04ba3c648225cf2","hex")
}
else if(process.argv[2]=="manu")
{
    var address1 = "0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c";    
    var address2 = "0x031E5c3f81B599A1fA39d7CF2c894DDE59eaB968";
    privateKey1 = new Buffer.from("5f00744254d7963a4b50dd4abd867b4838ddeb32d6b24327065fc4484a9eeaff", "hex");
}





var receipt;

web3.eth.getBlockNumber().then((bn) => {
    if(bn != undefined) console.log("Sending...");
});
var gp = web3.eth.getGasPrice().then((gasPrice) => {
    
    return web3.utils.toHex(gasPrice);
});
const gasLimitHex = web3.utils.toHex(3000000);
gp.then((gasPriceHex) => {
    var accounts = [address1, address2];
    
           
            web3.eth.getTransactionCount(address1).then((nonce) => {
    
                var rawTx = {
                    from:accounts[0],
                    nonce: nonce,
                    gasPrice: gasPriceHex,
                    gasLimit: gasLimitHex,
                    to: accounts[1],
                    data: web3.utils.toHex(process.argv[3])
                };
                var tx = new Tx(rawTx);
                tx.sign(privateKey1);
                var serializedTx = tx.serialize();
                web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then(console.log("sended"));

                
            });
        });
    
