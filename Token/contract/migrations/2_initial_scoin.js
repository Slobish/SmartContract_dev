var Scoin = artifacts.require("./Scoin.sol");

module.exports = function(deployer)
{
  deployer.deploy(Scoin);
};
