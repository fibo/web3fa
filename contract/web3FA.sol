// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Web3FA {

    mapping(address => string) private userStrings;

    function write(string memory newString) public {
            require(msg.sender == tx.origin, "You can only write from your address");
            userStrings[msg.sender] = newString;
    }

    function read(address userAddress) public view returns (string memory) {
            return userStrings[userAddress];
    }
}
