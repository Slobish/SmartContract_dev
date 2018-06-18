const Web3 = require('web3');
const solc = require('solc');
const fs   = require('fs');
const Tx = require('ethereumjs-tx');
web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg'));

var address= "0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c";
var password= "5f00744254d7963a4b50dd4abd867b4838ddeb32d6b24327065fc4484a9eeaff";

web3.eth.personal.newAccount('!@superpassword').then((response) => {console.log(response)})

/*
web3.eth.personal.unlockAccount(address, password, 600)
	.then((response) => {
		console.log(response);
	}).catch((error) => {
		console.log(error);
    });
    */