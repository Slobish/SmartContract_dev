var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/gVROUotOnxSTmy1sYfao'));

var code="";
var estimatedWei="";
var receiveAddress="";
for(i=0;i<10;i++)
{
    code=code+Math.floor(Math.random()*Math.floor(9));
}

document.getElementById("code").innerHTML="Expecting to receive "+estimatedWei+" wei <br> on this address: "+receiveAddress+"<br> with this code: "+code;
