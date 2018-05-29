pragma solidity ^0.4.23;

contract Inter 
{
    uint256 memories;
    address lastCaller;
    address firstCaller;
    bool isFirst=true;

    function () public payable
    {
  
        if (isFirst) 
        {
            require(msg.value >= 2 ether);
            firstCaller = msg.sender;            
            isFirst = false;
        }
        memories = memories + msg.value;
        lastCaller = msg.sender;
    }
    function withdraw() public
    {
        require(msg.sender == firstCaller);
        firstCaller.transfer(this.balance);
    }
    function sayMemories() public view returns (uint256 ) 
    {
        return memories;
    }
    function sayCaller() public view returns (address ) 
    {
        return lastCaller;
    }
}