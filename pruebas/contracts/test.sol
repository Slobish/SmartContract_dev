pragma solidity ^0.4.4;

contract test
{
    address public name;
    
    
    function set (address s) public 
    {        
        name = s;
    }
    function get() public view returns (address)
    {
        return name;
    }
    
}
