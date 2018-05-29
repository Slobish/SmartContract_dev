var Inter = artifacts.require("Inter");

contract('Inter', async (accounts) => {

        it("Should first receive more than 2 ethers to start working", async() =>
                 {
                   
                    var amount = Number(web3.toWei('2','ether'));
                    

                    var contractInstance = await Inter.new(); // awaits the contract to finally deploy

                    var originAccount    = web3.eth.accounts[0];     
                    var destinyAccount   = contractInstance.address;
                    var originBalance    = web3.eth.getBalance(originAccount).toNumber();
                    var destinyBalance   = web3.eth.getBalance(contractInstance.address).toNumber();

                    console.log("cuenta 0        :"+originAccount);
                    console.log("cuenta contrato: "+destinyAccount);

                    console.log("money en cuenta 0 :"+originBalance);
                    console.log("money en contrato :"+destinyBalance);

                    contractInstance.sendTransaction({from:originAccount,to:destinyAccount,value:web3.toWei('2','ether')});

                    console.log("money en cuenta 0 LUEGO DEL TX "+web3.eth.getBalance(originAccount));
                    console.log("money en contrato LUEGO DEL TX "+ web3.eth.getBalance(destinyAccount));

                //tuinstanciadelcontrato.funcion(parametros,...., { from: cuenta, value: monto })
                assert.equal(web3.eth.getBalance(contractInstance.address), destinyBalance + amount );
                });

});
