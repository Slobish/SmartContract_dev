var Web3 = require('web3');
var fs = require('fs');
web3 = new Web3(new Web3.providers.HttpProvider('http://pc9:8545'));
while(true)
{
    try
    {
        acc=web3.eth.accounts.create();
        account=acc.address;
        pw =acc.privateKey;
        //console.log(acc + " has" +" balance");
        web3.eth.getBalance(account)
        .then((e)=>
        {
            var txt = "private-key: "+pw+" has: "+e
            if(e!=0) console.log(txt);
        })

    }
    catch(e)
    {

    }

}