//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EVoting {
    //Data address and Total Voting Material
    address public admin;
    uint public totalVotingMaterials;

    //Data For Voting Material
    struct VotingMaterial {
        uint id;
        string title;
        string desc;
        mapping(address => bool) hasVoted;
        uint vote;
        bool exists;
    }

    //For Mapping Vote Id
    mapping(uint => VotingMaterial) public votingMaterials;

    //Delete Voting
    function deleteVotingMaterials(uint _index) external onlyAdmin {
      require(_index >= 0, "Value is null");
      delete votingMaterials[_index];
    }

    //For Adding Message to front end
    event VotingMaterialCreated(uint indexed id, string title, string desc);
    event Voted(uint indexed id, address indexed voter);

    //Message for Check the account Admin only
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    //For Creating Vote Material
    function createVotingMaterial(string memory _title, string memory _desc) external onlyAdmin {
        require(bytes(_title).length > 0, "Title is Empty !");
        require(bytes(_desc).length > 0, "Description is Empty !");
        uint id = totalVotingMaterials++;
        votingMaterials[id].id = id;
        votingMaterials[id].title = _title;
        votingMaterials[id].desc = _desc;
        votingMaterials[id].exists = true;
        emit VotingMaterialCreated(id, _title, _desc);
    }

    //For Voting Material
    function vote(uint _id) external {
        require(votingMaterials[_id].exists, "Voting material does not exist");
        require(!votingMaterials[_id].hasVoted[msg.sender], "Already voted");
        votingMaterials[_id].vote++;
        votingMaterials[_id].hasVoted[msg.sender] = true;
        emit Voted(_id, msg.sender);
    }

    //For checking that, Does the user privillage is Admin or Not ?
    function isAdmin() external view returns(bool) {
        return msg.sender == admin;
    }
}
