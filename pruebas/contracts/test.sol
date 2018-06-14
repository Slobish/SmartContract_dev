pragma solidity ^0.4.4;

contract test
{
    bytes32 public name="hola";
    
    
    function set (bytes32 s) public 
    {        
        name = s;
    }
    function get() public view returns (bytes32)
    {
        return name;
    }
    
}