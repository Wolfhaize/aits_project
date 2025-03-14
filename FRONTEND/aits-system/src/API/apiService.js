import axios from 'axios'


const API_BASE_URL = 'http//localhost:8000/api';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'Content-Type':'application/json',
    },
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
    
);

api.interceptors.response.use(
    (response) => {
      
      return response;
    },
    (error) => {
    
      if (error.response && error.response.status === 401) {
    
        console.log('Authentication error - redirecting to login');
        localStorage.removeItem('authToken');
        
       }
    }
);  

const apiService = {
  login: async (credentials) => {
    const response = await axios.post('${API_BASE_URL}/login', credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;

  },


  logout: () => {
    localStorage.removeItem('authToken');
  
  },
  getIssues: async () => {
    try {
    const response = await api.get('/issues/');
    return response.data;
  } catch (error) {
    console.error('Error fetching issues: ', error.response?.data || error.message);
    throw error;
    }
  },
  getIssueById: async (issueId) => {
    try {
      const response = await api.get(`/issues/${issueId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching issue ${issueId}: `, error.response?.data || error.message);
      throw error;
    }
  },

 
  updateIssue: async (issueId, issueData) => {
    try {
      const response = await api.put(`/issues/${issueId}/`, issueData);
      return response.data;
    } catch (error) {
      console.error(`Error updating issue ${issueId}: `, error.response?.data || error.message);
      throw error;
    }
  },

  
  deleteIssue: async (issueId) => {
    try {
      const response = await api.delete(`/issues/${issueId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting issue ${issueId}: `, error.response?.data || error.message);
      throw error;
    }
  },
};



  





export default apiService;