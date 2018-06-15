var Web3=require('web3');
var Tx=require('ethereumjs-tx');

var web3 = new Web3 ( new Web3.providers.HttpProvider('https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg'));

var gasL=2600000;
var gasP=1000000000;
var privateKey = new Buffer.from('5f00744254d7963a4b50dd4abd867b4838ddeb32d6b24327065fc4484a9eeaff','hex');
var p= web3.eth.getTransactionCount('0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c');
p.then((nonce)=>{
    
    rawTx=
        {
        value:web3.utils.toWei('0.1','ether'),
        nonce:nonce,
        from: '0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c',
        to: '0xd362B79268Fa0Ce9fbE8AE65621A8E9933EE47ee',
        data: '0xc9353cb5000000000000000000000000d024ddb58151a98af48bf5b8c86c21ec1b624654',
        gasLimit:gasL,
        gasPrice:gasP
        
    
        }
    
    var tx= new Tx(rawTx);
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', function(e){e.log;});
});
    



