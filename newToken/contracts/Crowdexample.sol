pragma solidity ^0.4.24;

import "./Scoin.sol";
import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";

contract Crowdexample is Crowdsale 
{   
    Scoin token;
    constructor(uint256 _rate, address _wallet, Scoin _token) public {
        require(_rate > 0);
        require(_wallet != address(0));
        require(_token != address(0));

        rate = _rate;
        wallet = _wallet;
        token = _token;
    }

    function _deliverTokens(address _beneficiary,uint256 _tokenAmount)
        internal 
        {
        token.mint(_beneficiary, _tokenAmount);
    }
}
