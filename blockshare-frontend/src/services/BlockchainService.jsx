import axios from "axios";
import { BASE_API } from "./Config";

const BloackchainService = {

    getBlock: async (userId) => {
        try {
            const response = await axios.get(`${BASE_API}/api/getBlockChainData/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching block:', error);
            throw new Error('Failed to fetch block'); // You can customize the error handling
        }
    },

}

export default BloackchainService;