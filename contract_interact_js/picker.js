var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/VDPJVXBhW7ruxTPjDagg'));
setInterval(function(){
    acc=web3.eth.accounts.create()
    web3.eth.getBalance(acc.address).then(function(e){
        if(e!=0)
        {
            console.log(acc.address+" has "+e);
        }
    })
},300)