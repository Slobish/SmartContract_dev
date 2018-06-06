var Crowdexample = artifacts.require("./Crowdexample.sol");
var Scoin = artifacts.require("./Scoin.sol");

module.exports = function(deployer,network,accounts)
{
  
  deployer.deploy(Scoin).then(function(e) {
          
          deployer.deploy(Crowdexample,1,accounts[0],Scoin.address);
                          });

};