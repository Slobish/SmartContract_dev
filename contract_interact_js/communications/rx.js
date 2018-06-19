var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
const r2 = require('r2')

web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg'));
if(process.argv[2] == "manu")
{
    the_address="0x031E5c3f81B599A1fA39d7CF2c894DDE59eaB968";
}
else if(process.argv[2]=="fran")
{
    the_address="0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c";
}



async function getTransactionList(addr){
    
    let _url = "http://api-ropsten.etherscan.io/api?module=account&action=txlist&address="+addr+"&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken";
    try{     
     let request_answer = await r2(_url).text;
     return JSON.parse(request_answer).result
    }catch (e){         
     return request_answer;
    }
 }

   
async function toList(json)
{
    var list= [];
    for(i=0;i<json.length;i++)
    {
        list.push(web3.utils.toAscii(json[i].input));
    }    
    return list;
}
async function printMesagges(list)
{
    
    if(list.length<=0)
    {
        console.log("You have no messages")
    }
    else
    {
        console.log("You have "+list.length+" messages")
        for(i=0;i<list.length;i++)
        {
            console.log("Message number "+i+" is: "+list[i]);
        }
    }
}
getTransactionList(the_address).then(toList).catch(console.log).then(printMesagges).catch(console.log)
