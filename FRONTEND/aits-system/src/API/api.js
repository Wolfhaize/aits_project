import axios from 'axios';


const API_URL = 'https://dummyjson.com/test'; // Mock API


export const login = async (email, password) => {

    const response = await axios.post(`${API_URL}/users`, { email, password });
    return response.data;
 
};