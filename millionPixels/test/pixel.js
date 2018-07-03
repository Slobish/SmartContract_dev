const MillionPixel = artifacts.require("MillionPixel.sol");

contract("MillionPixel", async (accounts) => {

  it("Buying tiles", async () => {
    var contract = await MillionPixel.deployed();
    var events = contract.Purchase();
    await contract.buySquare.sendTransaction(0,0,1,1,{value:1*1*100*2000000000000000});
    assert.equal(1,1);
    });

  
  
})
