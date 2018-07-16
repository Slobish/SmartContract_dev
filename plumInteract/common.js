const fs   = require('fs');
module.exports =
{
    getContractInstance:function (abi,options)
    {   
        if(!typeof abi === 'object') var abi = JSON.parse(abi);
        var instance = web3.eth.contract(abi).at(options.at);
        return instance;
    },

    getTransactionBytecode:function (instance,options)
    {
        var p = options.parameters;
        
        var bytecode = instance[options.function].getData(p[0],p[1],p[2]); // AMOUNT OF ARGUMENTS MUST MATCH WITH FUNCTION
        
        return bytecode;
    },

    getEventInstance:function (abi,options)
    {    
        var instance = getContractInstance(abi,options)
        var event = instance.allEvents()
        
        // watch for changes
        event.watch(function(error, result)
        {
        if (!error)
            console.log(result);
        });
        
    },

    getAbi:function (filename,name)
    {
        const solc = require('solc');
        var fileName = filename;
        var contractName = name;
        var compiledInstance = solc.compile(fs.readFileSync(fileName).toString());
        var abi = JSON.parse(compiledInstance.contracts[':'+contractName].interface);
        var bytecode = compiledInstance.contracts[':'+contractName].bytecode;
        return abi;
    }
}