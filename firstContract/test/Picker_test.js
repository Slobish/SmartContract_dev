var Picker = artifacts.require("Picker");

contract('Picker', async (accounts) => {

    it("Should reclaim ownership after first transaction", async() =>
             {
               
                var amount = Number(web3.toWei('1','ether'));               

                var contractInstance = await Picker.deployed(); // awaits the contract to finally deploy

                await contractInstance.receiver( { value: web3.toWei('1','ether') } );

                //tuinstanciadelcontrato.funcion(parametros,...., { from: cuenta, value: monto })
                assert.equal(amount , Number(web3.eth.getBalance(contractInstance.address)) );
            });
    it("Should not be owner after lower transaction ", async() =>
            {
                var amount = Number(web3.toWei('2','ether'));               

                var contractInstance = await Picker.deployed(); // awaits the contract to finally deploy

                await contractInstance.receiver( { from:web3.eth.accounts[0] ,value: amount } );

                await contractInstance.receiver( { from:web3.eth.accounts[1] ,value: amount-1 } );

                assert.notEqual(contractInstance.sayOwner(),web3.eth.accounts[1]);

            });

});