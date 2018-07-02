pragma solidity ^0.4.23;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/solidity-stringutils/src/strings.sol";

contract MillionPixel is Ownable {
    
    using SafeMath for uint256;
    using strings for *;
    
    address internal owner;
    uint constant pixPrice=2000000000000000; //0.002 ether
    uint constant minSquare=10; // 10x10 pixel squares represent minimun advertisement size
    uint constant squareDensity=100; // 100 pixels per square as 10x10 == 100

    mapping (address=>uint256) public contributors;  
    struct AdvertisementModel
    {
        address owner;
        uint256 x;
        uint256 y;
        uint256 width;
        uint256 height;
        string name;
        string image;
        string text;
    }

    AdvertisementModel[] public Advertises;
    
    bool[100][100] public grid;
    
    mapping (bytes32=>address) pixelOwner;


    constructor() public {
        
        owner = msg.sender;
    }

    function buySquare(uint x, uint y, uint width, uint height) public payable returns (uint)
    {
        require(msg.value >= getPrice(width,height));

        for(uint i = 0;i<width;i++) 
        {
            for(uint j = 0;j<height;j++) 
            {
                if (grid[x+i][y+j]) 
                {
                    // Already taken, undo.
                    revert();
                }
                grid[x+i][y+j] = true;
            }
        }   
        AdvertisementModel memory ad = AdvertisementModel(msg.sender,x,y,width,height,"","","");
        uint advertiseID = Advertises.push(ad)-1;
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

    // values represented by squares so as given sx=10 means 100 pixels width
    function getPrice(uint sx,uint sy) public pure returns(uint256)
    {        
        return sx*sy*squareDensity*pixPrice;            
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