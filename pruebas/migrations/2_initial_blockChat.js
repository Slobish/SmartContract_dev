var blockChat = artifacts.require("./blockChat.sol");

module.exports = function(deployer) {
  deployer.deploy(blockChat);
};
