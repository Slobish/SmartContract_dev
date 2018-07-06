pragma solidity ^0.4.23;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/solidity-stringutils/src/strings.sol";

contract MillionPixel is Ownable {
    
    using SafeMath for uint256;
    
    event Purchase(uint advertiseID);
    
    mapping (address=>uint256) public contributors;
    mapping (int256=>bool) grid;    
    mapping (bytes32=>address) pixelOwner;

    struct AdvertisementModel
    {
        address owner;
        int256 x;
        int256 y;
        uint256 width;
        uint256 height;
        string name;
        string image;
        string text;
    }

    AdvertisementModel[] public Advertises;

    address internal owner;       
    uint constant centralPixPrice=2000000000000000000; //2 ether
    uint constant minSquare=10; // 10x10 pixel squares represent minimun advertisement size
    uint constant squareDensity=100; // 100 pixels per square as 10x10 == 100

    constructor() public {
        
        owner = msg.sender;
    }
    
    function buySquare(int128 x, int128 y, uint width, uint height) public payable returns (uint256)
    {
        int256 ID = x;
        ID = (ID<<128) | y;
        
        require(msg.value >= getPrice(x,y,width,height));

        for(uint i = 0;i<width;i++) 
        {
            for(uint j = 0;j<height;j++) 
            {
                if (grid[ID])
                {
                    revert();
                }
                grid[ID] = true;
            }
        }   

        AdvertisementModel memory ad = AdvertisementModel(msg.sender,x,y,width,height,"","","");
        Advertises.push(ad);
        uint256 advertiseID = Advertises.length-1;

        emit Purchase(advertiseID);
        return advertiseID;
    }
    
    function modifySquare(uint advertiseID, string text, string image, string name) public
    {
        AdvertisementModel storage ad = Advertises[advertiseID];
        require(msg.sender == ad.owner);
        ad.text = text;
        ad.image = image;
        ad.name = name;      
    }   
    function changeOwner(uint advertiseID,address newOwner) public 
    {   
        AdvertisementModel storage ad = Advertises[advertiseID];
        require(msg.sender == ad.owner);
        ad.owner = newOwner;
    }
    // values represented by squares so as given sx=10 means 100 pixels width
    function tilePrice(int128 x,int128 y) public pure returns(uint256)
    {
        return centralPixPrice/(1+ uint(x)*uint(x) + uint(y)*uint(y) );
    }
    function getPrice(int128 x,int128 y,uint width,uint height) public pure returns(uint256)
    {        
        uint256 finalPrice = 0;
        for(int i = y;i<y+int(height);i++)
        {
            for(int j = x;j<x+int(width);j++)
            {
                finalPrice = finalPrice + ( tilePrice(x,y));
            }
        }
        return finalPrice;            
    }
    
    function withdraw() public onlyOwner
    {
        owner.transfer(this.balance);
    }

    function donate() public payable returns(string)
    {
        contributors[msg.sender] = msg.value;
        return "Thank you";
    }    
}