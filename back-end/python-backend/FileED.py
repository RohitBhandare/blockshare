from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from cryptography.fernet import Fernet
from flask import jsonify
import os
import requests
import base64
from flask import render_template
app = Flask(__name__)


# Specify the path to the key file
key_file_path = 'BlockShare\\back-end\\python-backend\\keys\\key.key'



with open(key_file_path, 'rb') as filekey:
    key = filekey.read()

# Create the Fernet class instance
cipher_suite = Fernet(key)
print(key)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = secure_filename(file.filename)

        # Read the uploaded file
        file_data = file.read()

        # Encrypt the file data
        encrypted_data = cipher_suite.encrypt(file_data)

        # Pin the encrypted file to Pinata
        headers = {
            'pinata_api_key': '17c77d008bc1cd3adef3',
            'pinata_secret_api_key': '354b0d3623035dab594d7b8e5a47c0fc9adfc16a2d92f48a8f48f4fb29ddfb24'
        }
        files = {
            'file': (filename, encrypted_data)
        }
        response = requests.post('https://api.pinata.cloud/pinning/pinFileToIPFS', headers=headers, files=files)

        if response.status_code == 200:
            return jsonify({'message': 'File uploaded and pinned successfully'})

    return jsonify({'error': 'Failed to upload and pin the file'})

@app.route('/getfiles', methods=['GET'])
def get_files():
    headers = {
        'pinata_api_key': '17c77d008bc1cd3adef3',
        'pinata_secret_api_key': '354b0d3623035dab594d7b8e5a47c0fc9adfc16a2d92f48a8f48f4fb29ddfb24'
    }
    response = requests.get('https://api.pinata.cloud/data/pinList?status=pinned', headers=headers)

    print(response.json())

    if response.status_code == 200:
        pinned_files = response.json().get('rows', [])

        # print(pinned_files)
        # Decrypt files before returning
        decrypted_files = []
        for file_info in pinned_files:
            file_hash = file_info.get('ipfs_pin_hash')
            file_name = file_info.get('metadata').get('name')
            print(file_hash)

            # Fetch file content from Pinata
            file_response = requests.get(f'https://gateway.pinata.cloud/ipfs/{file_hash}')

            if file_response.status_code == 200:
                encrypted_data = file_response.content
                print(key)
                decrypted_data = cipher_suite.decrypt(encrypted_data)

                decrypted_data = base64.b64encode(decrypted_data).decode('utf-8')


            # Create a dictionary with 'name' and 'content'
                decrypted_files.append({
                    'name': file_name, 
                    'content': decrypted_data,
                    'hash': file_hash, 
                    
                      })
                print("a",decrypted_files)

        return jsonify(files=decrypted_files)

    return jsonify({'error': 'Failed to retrieve files from Pinata'})




if __name__ == '__main__':
    app.run(debug=True)
