pragma solidity ^0.5.6;

contract AdditionGame {
    address public owner;
    
    address account;
    struct check_poll{
        bool ischeck;
        uint[] items;
    }

    mapping(address => check_poll) dopoll;

    constructor() public {
        owner = msg.sender;
    }

    function storeResult(uint size, uint[] memory item, address _account) public {
        check_poll storage dovote = dopoll[_account];
        for(uint i=0;i<size;i++){
            dovote.items.push(item[i]);
        }
    }

    function getResult(address _account) public view returns(uint[] memory){
        check_poll storage dovote = dopoll[_account];
        return dovote.items;
    }

    function doit(address _account) public{
        check_poll storage dovote = dopoll[_account];
        dovote.ischeck = true;
    }

    function check(address _account) public returns(bool){
        check_poll storage dovote = dopoll[_account];
        return dovote.ischeck;
    }
}
