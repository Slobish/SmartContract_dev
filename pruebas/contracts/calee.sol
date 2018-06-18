pragma solidity ^0.4.23;

contract calee {
    uint8 public answer1;
    bytes32 public answer2;
    uint public answer3;
    bytes32 public answer4;
    uint public answer5;

    constructor() public {
        answer1 = uint8(keccak256(block.blockhash(block.number - 1), now));
        answer2 = keccak256(block.blockhash(block.number - 1), now);
        answer3 = now;
        answer4 = block.blockhash(block.number - 1);
        answer5 = block.number;
    }
    
    function guess() public {
        answer1 = uint8(keccak256(block.blockhash(block.number - 1), now));
        answer2 = keccak256(block.blockhash(block.number - 1), now);
        answer3 = now;
        answer4 = block.blockhash(block.number - 1);
        answer5 = block.number;
    }
}
