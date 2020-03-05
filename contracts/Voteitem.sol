pragma solidity ^0.5.6;
pragma experimental ABIEncoderV2;

contract Voteitem {
    address public owner;
    string Title;
    struct Poll_item{
        string[] items; 
    }
    
    mapping(string => Poll_item) Poll_items;
    constructor() public {
        owner = msg.sender;
    }

    function storeItem(string memory _Title, string[] memory _items) public {
       Poll_item storage newPoll = Poll_items[_Title];
       newPoll.items = _items;
    }

    function getItem(string memory _Title) public returns(string[] memory){
       Poll_item storage newPoll = Poll_items[_Title];
       return newPoll.items;
    }   
}
