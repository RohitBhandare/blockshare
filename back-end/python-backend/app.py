from datetime import datetime
import logging
import mimetypes
from flask import Flask, request, jsonify
from flask_caching import Cache
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename
from cryptography.fernet import Fernet
from flask import jsonify
import os
import requests
import base64
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from PyPDF2 import PdfFileReader, PdfReader
import google.generativeai as genai
from dotenv import load_dotenv
import os
import base64

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

from blochain_service import contract,w3

app = Flask(__name__)
CORS(app)

cache = Cache(app, config={'CACHE_TYPE': 'simple'})



fernet_key = os.getenv("FERNET_KEY")
mail_pwd=os.getenv("MAIL_PWD")
sqlalchemy_database_uri = os.getenv('SQLALCHEMY_DATABASE_URI')
mail_server = os.getenv('MAIL_SERVER')
mail_port = os.getenv('MAIL_PORT')
mail_username = os.getenv('MAIL_USERNAME')
mail_password = os.getenv('MAIL_PASSWORD')
mail_use_ssl = os.getenv('MAIL_USE_SSL')

# Initialize the Fernet cipher suite
cipher_suite = Fernet(fernet_key)

app.config['SQLALCHEMY_DATABASE_URI'] = sqlalchemy_database_uri
app.config['MAIL_SERVER']= mail_server
app.config['MAIL_PORT'] = mail_port
app.config['MAIL_USERNAME'] = mail_username
app.config['MAIL_PASSWORD'] = mail_password
app.config['MAIL_USE_SSL'] = mail_use_ssl

print("blochain connected ",w3.is_connected())

db = SQLAlchemy(app)

mail = Mail(app)

from sqlalchemy.orm import relationship


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    account_address = db.Column(db.String(255), nullable=True)
    files = relationship('File', backref='owner', cascade='all, delete-orphan')  # Cascade deletion added

    def __repr__(self):
        return f'<User {self.username}>'


class File(db.Model):
    id = db.Column(db.Integer, primary_key=True,index=True)
    filename = db.Column(db.String(255), nullable=False, index=True)
    size = db.Column(db.Integer, nullable=False)
    upload_time = db.Column(db.DateTime, default=datetime.utcnow)
    file_hash = db.Column(db.Text, index=True)
    file_content = db.Column(db.LargeBinary)
    file_type = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False, index=True)
    access_controls = db.relationship('AccessControl', backref='file', cascade='all, delete-orphan')  # Cascade deletion added
    
    def __repr__(self):
        return f"File('{self.filename}', '{self.size}', '{self.upload_time}')"


class AccessControl(db.Model):
    __tablename__ = 'access_control'

    id = db.Column(db.Integer, primary_key=True)
    file_id = db.Column(db.Integer, db.ForeignKey('file.id',ondelete='CASCADE'))
    senderUserId = db.Column(db.Integer, db.ForeignKey('user.id'))
    recipientUserId = db.Column(db.Integer, db.ForeignKey('user.id'))
    access_level = db.Column(db.Enum('owner', 'read', 'write', 'download'))
    active = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    

class BlockchainRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    file_id = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    transaction_hash = db.Column(db.String(255), nullable=False)
    from_address= db.Column(db.String(255), nullable=True)
    to_address= db.Column(db.String(255), nullable=True)
    block_number = db.Column(db.Integer, nullable=False)
    gas_used = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Enum('Success', 'Failure'), nullable=False)
    balance_eth = db.Column(db.String(255), nullable=False)
    action=db.Column(db.String(255), nullable=True)
    miner=db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<BlockchainRecord file_id={self.file_id}, user_id={self.user_id}, shared_user_id={self.shared_user_id}>'


@app.route('/api/upload', methods=['POST'])
def upload_file():
   
    db.create_all()
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    userId = request.form.get('userId')
    user_address = request.form.get('userAddress')
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = secure_filename(file.filename)

        # Read the uploaded file
        file_data = file.read()

    
# Get the MIME type of the file
        mime_type, _ = mimetypes.guess_type(filename)
        print(mime_type)
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

        

        print(response.json())
        if response.status_code == 200:
            print(response.json())
            filedata = File(filename=filename, size=len(file_data), file_hash=response.json().get('IpfsHash'), user_id=userId,file_content=encrypted_data,file_type=mime_type)
            tx_hash = contract.functions.uploadFile(response.json().get('IpfsHash')).transact({'from': user_address})
            tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

            # Get the balance of the address after the transaction
            balance_wei = w3.eth.get_balance(w3.to_checksum_address(user_address))
            balance_eth = w3.from_wei(balance_wei, 'ether')
            
            # Get block data
            block_data = w3.eth.get_block(tx_receipt.blockNumber)
            print(block_data)
            action="You uploaded a file"
            blockchain_record= BlockchainRecord(file_id=response.json().get('IpfsHash'), user_id=userId, transaction_hash=tx_hash.hex(),from_address=user_address,to_address=user_address, block_number=tx_receipt.blockNumber, gas_used=tx_receipt.gasUsed, status='Success', balance_eth=balance_eth,action=action,miner=block_data.miner)
            db.session.add(blockchain_record)

            db.session.add(filedata)
            db.session.commit()
            return jsonify({'message': 'File uploaded and pinned successfully'})

    return jsonify({'error': 'Failed to upload and pin the file'})

@app.route('/api/getfiles/<string:user_id>', methods=['GET'])
@cache.cached(timeout=1)  # Cache results for 60 seconds
def get_files(user_id):
    files = File.query.filter_by(user_id=user_id).all()
    decrypted_files = []

    for file in files:
        if file.file_content:  # Check if encrypted data is available in the database
            encrypted_data = file.file_content
            file_type = file.file_type
        else:
            # Fetch encrypted file content from Pinata
            file_hash = file.file_hash
            file_response = requests.get(f'https://cyan-general-otter-343.mypinata.cloud/ipfs/{file_hash}')
            if file_response.status_code == 200:
                encrypted_data = file_response.content
            else:
                continue

        # Decrypt the encrypted data
        decrypted_data = cipher_suite.decrypt(encrypted_data)
        decrypted_data = base64.b64encode(decrypted_data).decode('utf-8')

        decrypted_files.append({
            'name': file.filename, 
            'content': decrypted_data,
            'hash': file.file_hash,
            'file_type': file_type,
            'id': file.id,
        })

    if decrypted_files:
        return jsonify(data=decrypted_files)
    else:
        return jsonify({'error': 'No files found for the user'})

@app.route('/api/signup', methods=['POST'])
def signup():
    db.create_all()
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    userdata = User(username=username, email=email, password=password)
    user = User.query.filter_by(email=email, password=password).first()
    if user:
        return jsonify({'error': 'User already exists'})
    
    

    db.session.add(userdata)
    db.session.commit()

    response_data = {
        'message': 'User added successfully',
        
    }

    print(response_data)

    return jsonify(response_data), 201
   

@app.route('/api/login', methods=['POST'])
def login():
    db.create_all()
    data = request.json
    username = data.get('username')
    password = data.get('password')
    print(username)
    user = User.query.filter_by(username=username, password=password).first()
    print(user)
    if user:
        response = {
            "success": True,
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "account_address": user.account_address
            }
        }
        return jsonify(response), 200
    else:
        response = {
            "success": False,
            "error": "Invalid email or password"
        }
        return jsonify(response), 401

    
@app.route('/api/sharefile', methods=['POST'])
def share_file():
    # db.create_all()  # Avoid calling create_all() in each request
    data = request.json
    file_hash = data.get('file_hash')
    recipient_username = data.get('recipientUsername')
    sender_user_id = data.get('senderUserId')
    access_level = data.get('accessLevel')
    my_blockchain_address = data.get('myAddress')

    print(access_level)

    # Check if the file exists
    file = File.query.filter_by(file_hash=file_hash).first()
    if not file:
        return jsonify({'error': 'File not found'})

    # Check if the recipient user exists
    recipient_user = User.query.filter_by(username=recipient_username).first()
    sender_user_name = User.query.filter_by(id=sender_user_id).first()

    if recipient_user:
        recipient_email = recipient_user.email
   
        msg = Message('File Shared with You',
              sender=('BlockShare SuperAdmin', app.config['MAIL_USERNAME']),
              recipients=[recipient_email])
        msg.body = f'Hi {recipient_user.username},\n\n{sender_user_name.username} has shared a file with you with the following access level:\n\n{access_level}.\n\nBest regards,\nBlockShare SuperAdmin'

        mail.send(msg)


    user_blockchain_address = recipient_user.account_address
    if not recipient_user:
        return jsonify({'error': 'Recipient user not found'})

    # Check if the file is already in the access control list
    access_control = AccessControl.query.filter_by(file_id=file.id, recipientUserId=recipient_user.id).first()
    if access_control:
        # If the file is already in the access control list, update its active status
        access_control.active = True
        access_control.access_level = access_level
    else:
        # If the file is not in the access control list, create a new access control entry
        access_control = AccessControl(
            file_id=file.id,
            recipientUserId=recipient_user.id,
            senderUserId=sender_user_id,
            access_level=access_level,
            active=True
        )
        tx_hash = contract.functions.shareFile(user_blockchain_address,file_hash).transact({'from': my_blockchain_address})
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        print(tx_receipt)

            # Get the balance of the address after the transaction
        balance_wei = w3.eth.get_balance(w3.to_checksum_address(my_blockchain_address))
        balance_eth = w3.from_wei(balance_wei, 'ether')
            
            # Get block data
        block_data = w3.eth.get_block(tx_receipt.blockNumber)
        action="You shared a file to "+recipient_username+" with access level "+access_level+" "
        blockchain_record= BlockchainRecord(file_id=file_hash, user_id=sender_user_id, transaction_hash=tx_hash.hex(),from_address=my_blockchain_address,to_address=user_blockchain_address, block_number=tx_receipt.blockNumber, gas_used=tx_receipt.gasUsed, status='Success', balance_eth=balance_eth,action=action,miner=block_data.miner)
        db.session.add(blockchain_record)
        db.session.add(access_control)

    db.session.commit()

    return jsonify({'message': 'File shared successfully'})

@app.route('/api/getsharedfiles/<string:user_id>', methods=['GET'])
def get_shared_files(user_id):
    db.create_all()
    shared_files = AccessControl.query.filter_by(senderUserId=user_id, active=True).all()
    print(shared_files)
    shared_files_data = []

    for shared_file in shared_files:
        file = File.query.filter_by(id=shared_file.file_id).first()
        if file.file_content:  # Check if encrypted data is available in the database
            encrypted_data = file.file_content
            file_type = file.file_type
        else:
            # Fetch encrypted file content from Pinata
            file_hash = file.file_hash
            file_response = requests.get(f'https://cyan-general-otter-343.mypinata.cloud/ipfs/{file_hash}')

            if file_response.status_code == 200:
                encrypted_data = file_response.content
            else:
                continue
       

        decrypted_data = cipher_suite.decrypt(encrypted_data)
        decrypted_data = base64.b64encode(decrypted_data).decode('utf-8')

        shared_files_data.append({
            'file_id': file.id,
            'filename': file.filename,
            'size': file.size,
            'upload_time': file.upload_time,
            'shared_time': shared_file.created_at,
            'owner': file.owner.username,
            'recipient_username': User.query.filter_by(id=shared_file.recipientUserId).first().username,
            'file_hash': file.file_hash,
            'file_type': file_type,
            'user_id': file.user_id,
            'access_level': shared_file.access_level,
            'content': decrypted_data
        })

    if shared_files_data:
        return jsonify(data=shared_files_data)
    else:
        return jsonify({'error': 'No shared files found for the user'})    

@app.route('/api/sharedwithme/<string:user_id>', methods=['GET'])

def shared_with_me(user_id):
    db.create_all()
    shared_files = AccessControl.query.filter_by(recipientUserId=user_id, active=True).all()
    print(shared_files)
    shared_files_data = []

    for shared_file in shared_files:
        file = File.query.filter_by(id=shared_file.file_id).first()
        hash=file.file_hash
        file_type=file.file_type

        if file.file_content:  # Check if encrypted data is available in the database
            encrypted_data = file.file_content
            file_type = file.file_type
        else:
            # Fetch encrypted file content from Pinata
            file_response = requests.get(f'https://cyan-general-otter-343.mypinata.cloud/ipfs/{hash}')

            if file_response.status_code == 200:
                encrypted_data = file_response.content
            else:
                continue

        
        
        decrypted_data = cipher_suite.decrypt(encrypted_data)
        decrypted_data = base64.b64encode(decrypted_data).decode('utf-8')

        shared_files_data.append({
            'file_id': file.id,
            'filename': file.filename,
            'size': file.size,
            'upload_time': file.upload_time,
            'shared_time': shared_file.created_at,
            'owner': file.owner.username,
            'recipient_username': User.query.filter_by(id=shared_file.recipientUserId).first().username,
            'file_hash': file.file_hash,
            'file_type': file_type,
            'user_id': file.user_id,
            'access_level': shared_file.access_level,
            'content': decrypted_data
        })

    if shared_files_data:
        return jsonify(data=shared_files_data)
    else:
        return jsonify({'error': 'No shared files found for the user'})
    
@app.route('/api/revokeaccess', methods=['POST'])
def revoke_access():
    db.create_all()
    data = request.json
    file_id = data.get('file_id')
    recipient_username = data.get('recipient_username')
    recipientUser = User.query.filter_by(username=recipient_username).first()
    if not recipientUser:
        return jsonify({'error': 'User not found'})
    
    recipientUserId = recipientUser.id

    print(file_id, recipientUserId)

    access_control = AccessControl.query.filter_by(file_id=file_id, recipientUserId=recipientUserId, active=True).first()
    if not access_control:
        return jsonify({'error': 'No access control found'})
    
    mydata= User.query.filter_by(id=access_control.senderUserId).first()
    userdata= User.query.filter_by(id=recipientUserId).first()
    myfiledata= File.query.filter_by(id=file_id).first()
    access_control.active = False
    tx_hash = contract.functions.revokeAccess(recipientUserId).transact({'from': mydata.account_address})
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    balance_wei = w3.eth.get_balance(w3.to_checksum_address(mydata.account_address  ))
    balance_eth = w3.from_wei(balance_wei, 'ether')

    
            
            # Get block data
    block_data = w3.eth.get_block(tx_receipt.blockNumber)
    action="You revoked access to "+recipient_username
    blockchain_record= BlockchainRecord(file_id=myfiledata.file_hash, user_id=access_control.senderUserId, transaction_hash=tx_hash.hex(),from_address=mydata.account_address,to_address=userdata.account_address, block_number=tx_receipt.blockNumber, gas_used=tx_receipt.gasUsed, status='Success', balance_eth=balance_eth,action=action,miner=block_data.miner)

    db.session.add(blockchain_record)
    db.session.commit()

    return jsonify({'message': 'Access revoked successfully'})

@app.route('/api/getUser', methods=['GET'])
def get_user():
    db.create_all()
   
    users = User.query.all()
    user_data = []

    for user in users:
        user_data.append({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'account_address': user.account_address
        })

    if user_data:
        return jsonify(data=user_data)
    else:
        return jsonify({'error': 'No users found'})

@app.route('/api/deletefile/<string:file_id>', methods=['DELETE'])
def delete_file(file_id):
    file = File.query.filter_by(id=file_id).first()
    if file:
        db.session.delete(file)
        db.session.commit()
        print("File deleted successfully")
        return "deleted successfully"
    return "File not found"

@app.route('/api/getBlockChainData/<string:user_id>', methods=['GET'])
def getBlockChainData(user_id):
    db.create_all()

    blockchain_records = BlockchainRecord.query.filter_by(user_id=user_id).all()
    blockchain_data = []

    for record in blockchain_records:
        blockchain_data.append({
            'file_id': record.file_id,
            'from_address': record.from_address,
            'to_address': record.to_address,
            'miner': record.miner,
            'timestamp': record.timestamp,
            'transaction_hash': record.transaction_hash,
            'block_number': record.block_number,
            'gas_used': record.gas_used,
            'status': record.status,
            'balance_eth': record.balance_eth,
            'action': record.action,
        })

    if blockchain_data:
        return jsonify(data=blockchain_data)
    else:
        return jsonify({'error': 'No blockchain records found'})
    

UPLOAD_FOLDER = 'BlockShare/back-end/python-backend/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def get_pdf_text(pdf_path):
    text = ""
    pdf_reader = PdfReader(pdf_path)
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=100000, chunk_overlap=10000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")

def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, don't provide the wrong answer\n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """

    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)

    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)

    return chain

def user_input(user_question):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    new_db = FAISS.load_local("faiss_index", embeddings)
    docs = new_db.similarity_search(user_question)

    chain = get_conversational_chain()

    response = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)
    return response["output_text"]

@app.route('/api/process', methods=['POST'])
def process():
    user_question = request.form['user_question']
    print(user_question)

    pdf_content = request.form['pdf_content']
    decoded_data = base64.b64decode(pdf_content)

    filename = f"{user_question[:3]}_file.pdf"  # Example: Take the first 3 characters of the question
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    # Write the decoded PDF content to a file
    with open(file_path, 'wb') as file:
        file.write(decoded_data)

    # Extract text from the PDF file
    raw_text = get_pdf_text(file_path)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)

    result = user_input(user_question)

    os.remove(file_path)

    print("File saved successfully:", filename)
    print("Result:", result)

    return jsonify({'result': result})

    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)
    db.create_all()
