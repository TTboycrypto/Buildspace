// SPDX-License-Identifier: UNLICENSED

// Basis of writing Smart Contract: Read Functions, write functions, and changing a state variable. We will be able to call these functions from our react app!

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    constructor() {
        console.log("Solidity cohort - Path to getting a web3 career!");
    }

    function wave() public {
        totalWaves +=1;
        console.log("%s has RSVPD!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total rsvp!", totalWaves);
        return totalWaves;
    }
}