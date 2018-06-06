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
    crowd.setParameters(1,web3.eth.accounts[0],scoin.address);
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

    await crowd.setParameters(1,wallet,token);
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

    await crowd.setParameters(1,wallet,token);
    await scoin.setAllowed(crowd.address);

    var initialBalance_beneficiary= await scoin.balanceOf(buyer);
    var initialBalance_wallet= await scoin.balanceOf(wallet);

    await crowd.buyTokens(beneficiary,{from:buyer,value:amount});
    var finalBalance_wallet= await scoin.balanceOf(wallet);
    await scoin.transfer(wallet,amount-99*amount/100,{from:beneficiary});
    if ( Number(await scoin.balanceOf(beneficiary)) < Number(initialBalance_beneficiary)-Number(99*amount/100)) confirmer = true;
    assert.equal( Number(finalBalance_wallet),Number(initialBalance_wallet)+Number(99*amount/100));
    assert.equal(confirmer,true);

    });
    
  /*

  it("should call a function that depends on a linked library", async () => {
    let meta = await MetaCoin.deployed();
    let outCoinBalance = await meta.getBalance.call(accounts[0]);
    let metaCoinBalance = outCoinBalance.toNumber();
    let outCoinBalanceEth = await meta.getBalanceInEth.call(accounts[0]);
    let metaCoinEthBalance = outCoinBalanceEth.toNumber();
    assert.equal(metaCoinEthBalance, 2 * metaCoinBalance);

  });

  it("should send coin correctly", async () => {

    // Get initial balances of first and second account.
    let account_one = accounts[0];
    let account_two = accounts[1];

    let amount = 10;


    let instance = await MetaCoin.deployed();
    let meta = instance;

    let balance = await meta.getBalance.call(account_one);
    let account_one_starting_balance = balance.toNumber();

    balance = await meta.getBalance.call(account_two);
    let account_two_starting_balance = balance.toNumber();
    await meta.sendCoin(account_two, amount, {from: account_one});

    balance = await meta.getBalance.call(account_one);
    let account_one_ending_balance = balance.toNumber();

    balance = await meta.getBalance.call(account_two);
    let account_two_ending_balance = balance.toNumber();

    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  });
*/
})
