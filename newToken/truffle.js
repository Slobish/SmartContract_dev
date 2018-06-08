var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  
  networks:
  {    
    development: 
    {
      from:'0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c',
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
            
    },
    /*
    localhost: {
      
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    */
    ropsten: 
    {
        provider: new HDWalletProvider("castle dwarf arrange case guide hello involve mom budget ethics scheme ribbon", "https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg"),
        network_id: 3,
        gas: 4500000
    } 
      
  }
  
};