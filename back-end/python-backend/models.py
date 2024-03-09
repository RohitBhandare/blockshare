# models.py
from datetime import datetime


from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    account_address = db.Column(db.String(255), nullable=True)
    files = db.relationship('File', backref='owner', cascade='all, delete-orphan')  

    def __repr__(self):
        return f'<User {self.username}>'

class File(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    filename = db.Column(db.String(255), nullable=False, index=True)
    size = db.Column(db.Integer, nullable=False)
    upload_time = db.Column(db.DateTime, default=datetime.utcnow)
    file_hash = db.Column(db.Text, index=True)
    file_content = db.Column(db.LargeBinary)
    file_type = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False, index=True)
    access_controls = db.relationship('AccessControl', backref='file', cascade='all, delete-orphan')  

    def __repr__(self):
        return f"File('{self.filename}', '{self.size}', '{self.upload_time}')"

class AccessControl(db.Model):
    __tablename__ = 'access_control'

    id = db.Column(db.Integer, primary_key=True)
    file_id = db.Column(db.Integer, db.ForeignKey('file.id', ondelete='CASCADE'))
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

