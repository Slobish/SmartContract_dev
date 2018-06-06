var Crowdsale = artifacts.require("./Crowdexample.sol");
var Scoin = artifacts.require("./Scoin.sol");

module.exports = function(deployer,accounts)
{

  deployer.deploy(Scoin).then(secondDeploy(Scoin));
  

  function secondDeploy(scoin)
  {
    deployer.deploy(Crowdsale,1,accounts[0],scoin.address);
  }
};
