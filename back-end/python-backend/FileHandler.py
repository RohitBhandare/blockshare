from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from cryptography.fernet import Fernet
import requests

app = Flask(__name__)
# CORS(app, resources={r"/upload": {"origins": "http://localhost:5173"}})
# CORS(app, resources={r"/getfiles": {"origins": "http://localhost:5173"}})
# CORS(app, resources={r"/upload": {"origins": "*"}})
# CORS(app, resources={r"/getfiles": {"origins": "*"}})

CORS(app)

UPLOAD_FOLDER = 'BlockShare\\back-end\\python-backend\\uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Generate a Fernet key
def generate_key():
    return Fernet.generate_key()

# Encrypt a file using Fernet encryption
def encrypt_file(file_path, key):
    cipher = Fernet(key)
    with open(file_path, 'rb') as file:
        data = file.read()
    encrypted_data = cipher.encrypt(data)
    with open(file_path, 'wb') as file:
        file.write(encrypted_data)

# Decrypt a file using Fernet decryption
def decrypt_file(file_path, key):
    cipher = Fernet(key)
    with open(file_path, 'rb') as file:
        encrypted_data = file.read()
    decrypted_data = cipher.decrypt(encrypted_data)
    with open(file_path, 'wb') as file:
        file.write(decrypted_data)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Generate a Fernet key
        key = generate_key()

        # Encrypt the uploaded file
        encrypt_file(file_path, key)

        # Pin the encrypted file to Pinata
        with open(file_path, 'rb') as encrypted_file:
            headers = {
                'pinata_api_key': '17c77d008bc1cd3adef3',
                'pinata_secret_api_key': '354b0d3623035dab594d7b8e5a47c0fc9adfc16a2d92f48a8f48f4fb29ddfb24'
            }
            files = {
                'file': (filename, encrypted_file)
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

    if response.status_code == 200:
        pinned_files = response.json().get('rows', [])
        return jsonify({'files': pinned_files})

    return jsonify({'error': 'Failed to retrieve files from Pinata'})

if __name__ == '__main__':
    app.run(debug=True)