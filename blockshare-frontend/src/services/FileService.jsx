import axios from 'axios';
import { BASE_API } from './Config';

const FileService = {
    uploadFile: async (file,userId,ethereum_address) => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
        formData.append('userAddress', ethereum_address);
  
        const response = await axios.post(`${BASE_API}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        return response.data; // If needed, handle the response from the server
      } catch (error) {
        // Handle error responses or exceptions
        console.error('Error uploading file:', error);
        throw new Error('File upload failed'); // You can customize the error handling
      }
    },

    getAllFiles: async (userId) => {
        try {
            const response = await axios.get(`${BASE_API}/api/getfiles/${userId}`); // Pass userId in the URL
            console.log(response.data);
            return response.data; // Extract the file list from the response
        } catch (error) {
            console.error('Error fetching files:', error);
            throw new Error('Failed to fetch files'); // You can customize the error handling
        }
    },

    // Add a new function to share a file
    shareFile: async (file_hash, userId, recipientUsername, accessControl) => {
        try {
           

    
            const response = await axios.post(`${BASE_API}/api/sharefile`, {
                file_hash: file_hash,
                senderUserId: userId,
                recipientUsername: recipientUsername,
                accessLevel: accessControl,
                myAddress: localStorage.getItem('ethereum_address')
                
            });
    
            alert('File shared successfully'); // Alert the user about successful sharing
    
            return response.data; // If needed, handle the response from the server
        } catch (error) {
            console.error('Error sharing file:', error);
            throw new Error('File sharing failed'); // You can customize the error handling
        }
    },

    // Add a new function to get shared files
    getSharedFiles: async (userId) => {
        try {
            const response = await axios.get(`${BASE_API}/api/getsharedfiles/${userId}`); // Pass userId in the URL
            return response.data; // Extract the shared file list from the response
        } catch (error) {
            console.error('Error fetching shared files:', error);
            throw new Error('Failed to fetch shared files'); // You can customize the error handling
        }
    },

    getSharedWithMe: async (userId) => {
        try {
            const response = await axios.get(`${BASE_API}/api/sharedwithme/${userId}`); // Pass userId in the URL
            return response.data; // Extract the shared file list from the response
        } catch (error) {
            console.error('Error fetching shared files:', error);
            throw new Error('Failed to fetch shared files'); // You can customize the error handling
        }
    },

    revokeAccess : async (fileId, recipient_username) => {
      try {
          const response = await axios.post(`${BASE_API}/api/revokeaccess`, {
              file_id: fileId,
              recipient_username: recipient_username
          });
          console.log('Access revoked successfully:', response.data);
          // Optionally, you can update your component state or perform any necessary actions after revoking access
      } catch (error) {
          console.error('Error revoking access:', error.response.data);
          // Handle errors here
      }
    },

      deleteFile: async (file_id) => {
        try {
           
            const response = await axios.delete(`${BASE_API}/api/deletefile/${file_id}`); // Pass fileId in the URL
           
            console.log('File deleted successfully:', response.data);
            // Optionally, you can update your component state or perform any necessary actions after deleting the file
        } catch (error) {
            console.error('Error deleting file:', error.response.data);
            // Handle errors here
        }
    },



    

};    

export default FileService;
