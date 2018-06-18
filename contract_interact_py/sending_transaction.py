import sys
from web3 import Web3
node="https://ropsten.infura.io/VDPJVXBhW7ruxTPjDagg"
web3 = Web3(Web3.HTTPProvider(node))
url=[]
accounts=["0x640E89e5F495f47415Eb27e1Ac05ae34E009dC2c","0xAcad03778f6D0c871D1717f6CAF74330Fd371f8f"]
pvKeys=["5f00744254d7963a4b50dd4abd867b4838ddeb32d6b24327065fc4484a9eeaff","e38a2fddc8e23842bcba76adda80c3bd8284aadf8d92b077c0a400ecb1f9c75f"]
try:
    if(web3.eth.blockNumber != 0):
        node=node.split("//")
        for n in node:
            token=n.split("/")
            for i in token:
                url.append(i)
        for n in url:
            if ("." in n):
                name=n
        print ("Connected to "+name+" node")
    else:
        raise Exception  ("Couldn't connect")
except Exception as e:
    sys.exit("ERROR CONNECTING TO NODE: "+ e)
web3.eth.
try:
    options={
        "nonce":web3.eth.getTransactionCount(accounts[0]),
        "to":accounts[1],
        "from": accounts[0],
        "value": 1,
        "gasPrice":web3.eth.gasPrice,
        "gasLimit": ,
        
    }
    web3.eth.sendTransaction(options)
except Exception as e:    
    sys.exit("ERROR SENDING TRANSACTION: "+e)