from flask import Flask, request, jsonify
from web3 import Web3
from eth_utils import to_checksum_address
from eth_account import Account

# Generate a new Ethereum account
account = Account.create()

# # Print the Ethereum address and private key
# print("Ethereum Address:", account.address)
# print("Private Key:", account.privateKey.hex())



import json

# Load the ABI from the JSON file
with open('BlockShare/back-end/blockchain-backend/artifacts/contracts/FileSharing.sol/FileSharing.json', 'r') as f:
    contract_data = json.load(f)

# Extract the ABI from the contract data
contract_abi = contract_data['abi']

app = Flask(__name__)

# Connect to the local Hardhat node
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))

# Load contract ABI and address
contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"  # Update with your contract address


contract = w3.eth.contract(address=contract_address, abi=contract_abi)



# Define route to add file
@app.route('/add-file', methods=['POST'])
def add_file():
    user_address = request.json.get('user_address')
    file_url = request.json.get('file_url')

    # Send transaction to upload file
    tx_hash = contract.functions.uploadFile(file_url).transact({'from': w3.to_checksum_address(user_address)})
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    # Get transaction details
    transaction_details = {
        'transaction_hash': tx_hash.hex(),
        'block_number': tx_receipt.blockNumber,
        'gas_used': tx_receipt.gasUsed,
        'status': 'Success' if tx_receipt.status == 1 else 'Failure'

        # Add more details as needed
    }

    # Get the balance of the address after the transaction
    balance_wei = w3.eth.get_balance(w3.to_checksum_address(user_address))
    balance_eth = w3.from_wei(balance_wei, 'ether')
    # Gas price in Wei
    gas_price_wei = w3.eth.gas_price

# Gas used for the transaction
    gas_used = tx_receipt.gas_used

# Convert gas price to Ether
    gas_price_eth = w3.from_wei(gas_price_wei, 'ether')

# Calculate transaction cost (Ether spent)
    transaction_cost_eth = gas_price_eth * gas_used
    

    # Get block data
    block_data = w3.eth.get_block(tx_receipt.blockNumber)

    # Construct response
    response_data = {
        'message': 'File added successfully',
        'transaction_details': transaction_details,
        'block_data': {
            'block_number': block_data.number,
            'timestamp': block_data.timestamp,
            'miner': block_data.miner,
            'gas_limit': block_data.gasLimit,
            'gas_used': block_data.gasUsed,
            'balance_eth': balance_eth,
           
        }
    }

    return jsonify(response_data), 200



@app.route('/grant-access', methods=['POST'])
def grant_access():
    user_address = request.json.get('user_address')

    # Convert user_address to checksum format
    checksum_address = Web3.to_checksum_address(user_address)

    # Send transaction to grant access
    tx_hash = contract.functions.allow(checksum_address).transact({'from': checksum_address})
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    # Extract transaction details
    transaction_details = {
        'transaction_hash': tx_hash.hex(),
        'block_number': tx_receipt.blockNumber,
        'gas_used': tx_receipt.gasUsed
        # Add more details as needed
    }

    return jsonify({'message': 'Access granted successfully', 'transaction_details': transaction_details}), 200



@app.route('/revoke-access', methods=['POST'])
def revoke_access():
    user_address = request.json.get('user_address')
    tx_hash = contract.functions.disallow(user_address).transact({'from': user_address})
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    transaction_details = {
        'transaction_hash': tx_hash.hex(),
        'block_number': tx_receipt.blockNumber,
        'gas_used': tx_receipt.gasUsed
        # Add more details as needed
    }

    return jsonify({'message': 'Access revoked successfully', 'transaction_details': transaction_details}), 200



@app.route('/display-files', methods=['GET'])
def display_files():
    user_address = request.args.get('user_address')
    user_address = to_checksum_address(user_address)

    print(user_address)

    files = contract.functions.display(user_address).call()

    return jsonify({'message': 'Files displayed successfully', 'files': files}), 200



@app.route('/shared-access', methods=['GET'])
def shared_access():
    access_list = contract.functions.shareAccess.__call__().call()



    return jsonify({'message': 'Shared access retrieved successfully', 'access_list': access_list}), 200



if __name__ == '__main__':
    app.run(debug=True)
