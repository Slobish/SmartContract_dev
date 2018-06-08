module.exports = {
  networks: {
    networks:
  {
    development: {
      port: 9545,
      network_id:"*" ,
      host: "localhost"
    },
    localhost: {
      
      host: "localhost",
      port: 9545,
      network_id: "*"
    },
    ropsten: {
        provider: new HDWalletProvider("castle dwarf arrange case guide hello involve mom budget ethics scheme ribbon", "https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg"),
        network_id: 3,
        gas: 4500000
    }
     
  }
  }
};
