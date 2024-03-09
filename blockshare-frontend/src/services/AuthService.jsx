import axios from 'axios';
import { BASE_API } from './Config';

const AuthService = {
  login: async (username, password) => {
      try {
          const response = await axios.post(`${BASE_API}/api/login`, {
              username: username,
              password: password
          });
          return response.data;
      } catch (error) {
          throw error;
      }
  },

  signup: async (username, email, password) => {
    try {
      const response = await axios.post(`${BASE_API}/api/signup`, {
        username: username,
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
        console.log('Signup response:', response)
      console.log('Signup response:', response.data)

      
  
    
      return JSON.stringify(response);

    } catch (error) {
      throw error;
    }
  }
  
};

export default AuthService;
