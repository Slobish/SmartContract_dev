var Scoin = artifacts.require("./Scoin.sol");
var Crowdexample = artifacts.require("./Crowdexample.sol");
module.exports = function(deployer)
{
  deployer.deploy(Scoin);
  deployer.deploy(Crowdexample);
};