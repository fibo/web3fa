// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Web3FA {

    mapping(address => string) private userStrings;
    mapping(address => address) private delegates;


    // The delegateAccess function allows msg.sender to delegate access to another address (delegate)
    function delegateAccess(address delegate) public {
        require(msg.sender == tx.origin, "You can only delegate from your address");

        // Set the delegate for the message sender
        delegates[msg.sender] = delegate;
    }

    // The revokeAccess function revokes the access by setting the delegate address to zero (address(0))
    function revokeAccess() public {
        // Revoke the access by setting the delegate to zero address
        delegates[msg.sender] = address(0);
    }

    // The write and read functions check if msg.sender has set a delegate. 
    // If a delegate is set, operations are performed on the delegate's account. Otherwise, the operations are executed on the msg.sender account.

    function write(string memory newString) public {
        address delegate = delegates[msg.sender];

        if (delegate != address(0)) {
            userStrings[delegate] = newString;
        } else {
            require(msg.sender == tx.origin, "You can only write from your address");
            userStrings[msg.sender] = newString;
        }
    }

    function read() public view returns (string memory) {
        address delegate = delegates[msg.sender];

        if (delegate != address(0)) {
            return userStrings[delegate];
        } else {
            return userStrings[msg.sender];
        }
    }
}
