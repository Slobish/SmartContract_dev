pragma solidity ^0.4.23;

contract blockChat
{
    mapping (address=>uint256) received;

    function pay(address to) public payable
    {
        to.transfer(200);
        
    }
    function receive(uint256 a,string b,bytes k) public payable
    {

    }
    function donate() public payable
    {
        
    }
    
}

//0xab7dc4b2000000000000000000000000627306090abab3a6e1400e9345bc60c78a8bef57
//00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000004686f6c6100000000000000000000000000000000000000000000000000000000




