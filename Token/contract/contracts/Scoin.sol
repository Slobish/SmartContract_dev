pragma solidity ^0.4.4;

import "../openzeppelin-solidity-master/contracts/token/ERC20/StandardToken.sol";
import "../openzeppelin-solidity-master/contracts/ownership/Ownable.sol";


contract MintableToken is StandardToken, Ownable 
{
    event Mint(address indexed to, uint256 amount);
    event MintFinished();

    bool public mintingFinished = false;
    address public allowed;

    modifier canMint() {
        require(!mintingFinished);
        _;
    }

    modifier hasMintPermission() {
        require(msg.sender == owner || msg.sender == allowed);
        _;
    }

    function setAllowed (address allow) public onlyOwner
    {        
        allowed = allow;
    }
    /**
    * @dev Function to mint tokens
    * @param _to The address that will receive the minted tokens.
    * @param _amount The amount of tokens to mint.
    * @return A boolean that indicates if the operation was successful.
    */
    function mint(address _to,uint256 _amount) hasMintPermission canMint public returns (bool)
    {
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }

    /**
    * @dev Function to stop minting new tokens.
    * @return True if the operation was successful.
    */
    function finishMinting() onlyOwner canMint public returns (bool) {
        mintingFinished = true;
        emit MintFinished();
        return true;
    }
}


contract Scoin is MintableToken
{
    
    
}