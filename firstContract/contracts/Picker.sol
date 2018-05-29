pragma solidity ^0.4.23;

contract Picker
{
    address owner;
    uint256 ownerAmount;
    bool isFirst;
    function receiver() public payable
    {
        if(msg.value > 10*ownerAmount) owner=msg.sender; 
    }
    function sayOwner() public constant returns (address)
    {
        return owner;
    }
    function withdraw() public
    {
        owner.transfer(this.balance);
    }
}