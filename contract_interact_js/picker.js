var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

web3 = new Web3(new Web3.providers.HttpProvider('http://pc9:8545'));
setInterval(function(){
    acc=web3.eth.accounts.create()
    web3.eth.getBalance(acc.address).then(analize,50).catch(console.log)
})
var analize = function getter (e)
{
    value= Number(e);
    if(value>0)
    {
        console.log(acc.address+" has: "+value)
    }
}