const MillionPixel = artifacts.require("MillionPixel.sol");

contract("MillionPixel", async (accounts) => {

    it("Buying tiles", async () => {
        var contract = await MillionPixel.deployed();
        var receipt = await contract.buySquare.sendTransaction(0,0,1,1,{value:1*1*100*2000000000000000});
        var data = await web3.eth.getTransactionReceipt(receipt);
        assert.equal(web3.toDecimal(data.logs[0].data),0);
        }); 

    it("Modify square",async () => {
        var contract = await MillionPixel.deployed();
        var ads = await contract.Advertises(0);
        assert(ads[0],accounts[0]);
        await contract.modifySquare(0,"x","y","z");
        var ads = await contract.Advertises(0);
        assert(ads[5],"x");
        assert(ads[6],"y");
        assert(ads[7],"z");
    });
  
})
