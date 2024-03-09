// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileSharing {
    struct AccessRecord {
        address sender;
        address recipient;
        string fileHash;
        bool shared;
        bool revoked;
    }

    struct FileUpload {
        address uploader;
        string fileHash;
        bool uploaded;
    }

    mapping(uint => AccessRecord) public accessRecords;
    mapping(uint => FileUpload) public fileUploads;
    uint public accessRecordsCount;
    uint public fileUploadsCount;

    event FileShared(uint indexed id, address indexed sender, address indexed recipient, string fileHash);
    event AccessRevoked(uint indexed id, address indexed sender, address indexed recipient, string fileHash);
    event FileUploaded(uint indexed id, address indexed uploader, string fileHash);

    function shareFile(address _recipient, string memory _fileHash) external {
        // Perform validations if needed
        accessRecords[accessRecordsCount] = AccessRecord(msg.sender, _recipient, _fileHash, true, false);
        accessRecordsCount++;
        emit FileShared(accessRecordsCount - 1, msg.sender, _recipient, _fileHash);
    }

    function revokeAccess(uint _id) external {
        AccessRecord storage accessRecord = accessRecords[_id];
        require(accessRecord.sender == msg.sender, "You can only revoke your own access.");
        require(accessRecord.revoked == false, "Access already revoked.");
        
        accessRecord.revoked = true;
        emit AccessRevoked(_id, accessRecord.sender, accessRecord.recipient, accessRecord.fileHash);
    }

    function uploadFile(string memory _fileHash) external {
        // Perform validations if needed
        fileUploads[fileUploadsCount] = FileUpload(msg.sender, _fileHash, true);
        fileUploadsCount++;
        emit FileUploaded(fileUploadsCount - 1, msg.sender, _fileHash);
    }
}
