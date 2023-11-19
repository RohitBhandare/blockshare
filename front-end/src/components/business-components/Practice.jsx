import React, { Component } from 'react';
import FileService from './file-service/FileService';

export default class DisplayFiles extends Component {
  state = {
    files: [],
  };

  async componentDidMount() {
    try {
      const files = await FileService.getAllFiles();
      this.setState({ files });
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }

  render() {
    const { files } = this.state;

    return (
      <div>
        <h1>Files:</h1>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
             
              <p>ID: {file.id}</p>
              <p>IPFS Pin Hash: {file.ipfs_pin_hash}</p>
              <p>Number of Files: {file.number_of_files}</p>
              <p>User ID: {file.user_id}</p>
              {/* You can display more properties here */}
              <p>{file.metadata.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
