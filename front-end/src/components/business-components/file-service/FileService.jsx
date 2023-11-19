import axios from 'axios';

const FileService = {
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/upload', formData, {
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

  getAllFiles: async () => {
    try {
      const response = await axios.get('http://localhost:5000/getfiles');
      console.log(response.data.files)
      return response.data.files; // Extract the file list from the response
    } catch (error) {
      // Handle error responses or exceptions
      console.error('Error fetching files:', error);
      throw new Error('Failed to fetch files'); // You can customize the error handling
    }
  },
};

export default FileService;

