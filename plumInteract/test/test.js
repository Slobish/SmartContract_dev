const index = require ("../callByTransaction.js");
const common = require ("../common.js");
const Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg'));

options = {
    from:"0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c",
    at:  "0xbd1c30a4da8a4a07bb8c19e6e2692f18cbe930f6",
    pass:"5f00744254d7963a4b50dd4abd867b4838ddeb32d6b24327065fc4484a9eeaff",
    value:0,
    hasEvents:true,
    function:"setManuFranco",
    parameters:[2,2,2]
}

abi = common.getAbi("./test.sol","test");

index.callByTransaction(abi,options);