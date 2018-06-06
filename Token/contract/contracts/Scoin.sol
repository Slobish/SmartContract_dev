pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract Scoin is MintableToken
{
    address public allowed;

    modifier hasMintPermission() {
        require(msg.sender == owner || msg.sender == allowed);
        _;
    }
    
    function setAllowed (address allow) public onlyOwner
    {        
        allowed = allow;
    }
}