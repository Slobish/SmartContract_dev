pragma solidity ^0.4.23;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract MillionPixel is Ownable {
    
    using SafeMath for uint256;
    address internal owner;
    uint256 public centralPixPrice;
    address[][] pixelOwner;


    constructor(uint256 price) public {
        centralPixPrice = price;
        owner = msg.sender;
    }

    function setPixPrice(uint price) public onlyOwner
    {
        centralPixPrice = price;
    }
    function pixPrice(int256 x,int256 y) internal view returns (uint256)
    {
        uint256 X = 0;
        uint256 Y = 0;

        if(x<=0) X = uint256(0-x);
        if(y<=0) Y = uint256(0-x);
        return ( centralPixPrice / (1+X.mul(X)+X.mul(X)) );
    }
    

    function getPrice(int256 x,int256 y,int256 sx,int256 sy) internal view returns(uint256)
    {
        int256 startY = 0;
        int256 startX = 0;
        int256 finalY = 0;
        int256 finalX = 0;
        uint256 finalPrice = 0;

        if(sx>x)
        {
            startX = x;
            finalX = sx;
        }
        else 
        {
            startX = sx;
            finalX = x;
        }
        if(sy>y)
        {
            startY = y;
            finalY = sy;
        }
        else
        {
            startY = sy;
            finalY = y;
        } 
        for(int256 currentY = startY;currentY<finalY;currentY++)
        {
            for(int256 currentX = startX;currentX<finalX;currentX++)
            {
                finalPrice = finalPrice.add(pixPrice(currentX,currentY));
            }
        }
        return finalPrice;            
    }


    function withdraw() public onlyOwner
    {
        owner.transfer(this.balance);
    }



    
}