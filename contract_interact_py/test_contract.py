from web3 import *
import pytest
import os
WEB3="session"
import json






@pytest.fixture(scope=WEB3)
def instance_web3():
    web3 = Web3(HTTPProvider('http://localhost:8545'))
    return web3

@pytest.fixture(scope=WEB3)
def abi():
    with open('/home/fscucchiero/Desktop/git/SmartContract_dev/xapo-exchange/build/ExchangeToken.abi', 'r') as content_file:
        abi = content_file.read()
    with open('/home/fscucchiero/Desktop/git/SmartContract_dev/xapo-exchange/build/ExchangeToken.bin', 'r') as content_file:
        bytecode = content_file.read()
    contract=(abi,bytecode)
    return contract

@pytest.fixture(scope=WEB3)
def instance_contract(instance_web3,abi):

    # set pre-funded account as sender
    instance_web3.eth.defaultAccount = instance_web3.eth.accounts[0]

    # Instantiate and deploy contract
    contract = instance_web3.eth.contract(abi=abi[0], bytecode=abi[1])

    # Submit the transaction that deploys the contract
    tx_hash = contract.constructor().transact()

    # Wait for the transaction to be mined, and get the transaction receipt
    tx_receipt = instance_web3.eth.waitForTransactionReceipt(tx_hash)

    # Create the contract instance with the newly-deployed address
    greeter = instance_web3.eth.contract(
        address=tx_receipt.contractAddress,
        abi=abi[0],
    )
    return greeter
    # web3=instance_web3
    # tx_hash = web3.eth.contract(abi=abi[0],bytecode=abi[1]).deploy()
    
    # address = web3.eth.getTransactionReceipt(tx_hash)['contractAddress']
    # return address
    
    # coinbase = web3.eth.accounts[0]
    # options={
    #     "nonce":web3.eth.getTransactionCount(coinbase),
    #     "from": coinbase,
    #     "gasPrice":web3.eth.gasPrice,
    #     }    
    # contractModel = web3.eth.contract(abi=abi[0], bytecode=abi[1])
    # print(contractModel.constructor())
    # data = contractModel.constructor().__dict__.get('data_in_transaction')
    #return data

    #print(data)
    #web3.eth.sendTransaction(data)
    

def test_01(instance_contract,instance_web3):
    print(instance_contract)
    
# try:
#     if(web3.eth.blockNumber != 0):
#         node=node.split("//")
#         for n in node:
#             token=n.split("/")
#             for i in token:
#                 url.append(i)
#         for n in url:
#             if ("." in n):
#                 name=n
#         print ("Connected to "+name+" node")
#     else:
#        
# except Exception as e:
#     sys.exit("ERROR CONNECTING TO NODE: "+ e)
# web3.eth.
# try:
#     options={
#         "nonce":web3.eth.getTransactionCount(accounts[0]),
#         "to":accounts[1],
#         "from": accounts[0],
#         "value": 1,
#         "gasPrice":web3.eth.gasPrice,
#         "gasLimit": ,
        
#     }
#     web3.eth.sendTransaction(options)
# except Exception as e:    
#     sys.exit("ERROR SENDING TRANSACTION: "+e)


# def deployContract(instance_web3,getAbi):
#     print (getAbi[0])
#     print (getAbi[1])
#     assert 1==1
#   deploy_txn_hash = factory.constructor().transact(tx)
#   print('{0} deploy hash: '.format(name), deploy_txn_hash)
#   deploy_receipt = mine_tx(web3, deploy_txn_hash)
#   contract_address = deploy_receipt['contractAddress']
#   assert is_checksum_address(contract_address)
#   print('{0} deploy transaction mined. Contract address: '.format(name), contract_address)
#   return deploy_receipt