var caller = artifacts.require("./caller.sol");

module.exports = function(deployer) {
  deployer.deploy(caller);
};
