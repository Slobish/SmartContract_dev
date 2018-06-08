var Scoin = artifacts.require("./Scoin.sol");
var Crowdexample = artifacts.require("./Crowdexample.sol");
module.exports = function(deployer)
{  
  deployer.deploy(Scoin).then(function (){return deployer.deploy(Crowdexample,1,web3.eth.accounts[0],Scoin.address)});
   
};