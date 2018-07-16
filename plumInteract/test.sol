pragma solidity ^0.4.23;
contract test {

    uint256 a=0;
    uint256 b=0;
    uint256 c=0;

    event variableChange();

    function getManuFranco () public view returns (uint256)
    {
        return b;
    }
    
    function setManuFranco (uint g,uint f,uint d) public 
    {
        emit variableChange();
        a = g;
        b = f;
        c = d;
        
    }
}