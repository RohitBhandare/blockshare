import axios from 'axios';
import { BASE_API } from './Config';

const UserService = {


    getUser: async () => {
        try {
            const response = await axios.get(`${BASE_API}/api/getUser`); 
            return response.data; 
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Failed to fetch user'); // You can customize the error handling
        }
    },

};

export default UserService;
