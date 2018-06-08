const Crowdsale = artifacts.require("Crowdexample.sol");
const Scoin = artifacts.require("Scoin.sol");

contract("Scoin", async (accounts) => {

  it("Should not be allowed accounts", async () => {
    var scoin = await Scoin.deployed();
    var crowd = await Crowdsale.deployed();
    assert.equal(await scoin.allowed(),'0x0000000000000000000000000000000000000000');
    });

  it("Minting should be allowed", async () => {
    var scoin = await Scoin.deployed();
    var crowd = await Crowdsale.deployed();
    assert.equal(await scoin.mintingFinished(),false);
    });

  it("Setting parameters to crowdsale", async () => {
    var scoin = await Scoin.deployed();
    var crowd = await Crowdsale.deployed();
    
    assert.equal(await crowd.rate(),1);
    assert.equal(await crowd.wallet(),web3.eth.accounts[0]);
    assert.equal(await crowd.token(),scoin.address);
    });

  it("Allowing crowdsale to buy tokens", async () => {
    var scoin = await Scoin.deployed();
    var crowd = await Crowdsale.deployed();
    scoin.setAllowed(crowd.address);
    assert.equal(await scoin.allowed(),crowd.address);
    });

  it("Buying tokens should be reflected on ethereum's network", async () => {
    var scoin = await Scoin.deployed();
    var crowd = await Crowdsale.deployed();   
    
    var token = scoin.address;
    var wallet = web3.eth.accounts[0];
    var beneficiary = web3.eth.accounts[1];
    var buyer = web3.eth.accounts[2];
    
    var amount=100;
    var confirm = false;

    
    await scoin.setAllowed(crowd.address);

    var initialBalance_buyer= await web3.eth.getBalance(buyer);
    var initialBalance_wallet= await web3.eth.getBalance(wallet);
 
    await crowd.buyTokens(beneficiary,{from:buyer,value:amount});
    var finalBalance_wallet= await web3.eth.getBalance(wallet);
    
    if ( Number(await web3.eth.getBalance(buyer)) < Number(initialBalance_buyer)-Number(amount)) confirmer = true;
    assert.equal( Number(finalBalance_wallet),Number(initialBalance_wallet)+Number(amount));
    assert.equal(confirmer,true);

    });
  it("Transaction of tokens should be reflected on token's network", async () => {
    var scoin = await Scoin.deployed();
    var crowd = await Crowdsale.deployed();   
    
    var token = scoin.address;
    var wallet = web3.eth.accounts[0];
    var beneficiary = web3.eth.accounts[1];
    var buyer = web3.eth.accounts[2];
    
    var amount=10000;
    var confirm = false;

    
    await scoin.setAllowed(crowd.address);
    await crowd.buyTokens(beneficiary,{from:buyer,value:amount}); // tokens has arrived to beneficiary

    var initialBalance_beneficiary= await scoin.balanceOf(beneficiary);
    var initialBalance_wallet= await scoin.balanceOf(wallet);

    await scoin.transfer(wallet,99*initialBalance_beneficiary/100,{from:beneficiary}); // 99% of tokens goes to wallet

    var finalBalance_wallet= await scoin.balanceOf(wallet); 
    var finalBalance_beneficiary= await scoin.balanceOf(beneficiary);
 
    if ( Number(finalBalance_beneficiary) <= Number(finalBalance_beneficiary)-Number(99*initialBalance_beneficiary/100)) confirmer = true;
    assert.equal( Number(finalBalance_wallet),Number(initialBalance_wallet)+Number(99*initialBalance_beneficiary/100));
    assert.equal(confirmer,true);
   });
   
   it("Should not be available to mint if minting has finished",async function ()
   {

    var scoin = await Scoin.deployed();
    var crowd = await Crowdsale.deployed();   
    var finalize = false;
    var token = scoin.address;
    var wallet = web3.eth.accounts[0];
    var beneficiary = web3.eth.accounts[1];
    var buyer = web3.eth.accounts[2];
    
    var amount=10000;
    var confirm = false;
    
    
    await scoin.setAllowed(crowd.address);
    await scoin.finishMinting();
    
    var initialBalance_wallet = await scoin.balanceOf(web3.eth.accounts[5]);
    try
    {
      await crowd.buyTokens(web3.eth.accounts[5],{from:buyer,value:amount});
      finalize=true;
    }
    catch(err)
    {
      finalize=false;
    }
    assert.equal(finalize,false);
  });
  
})
