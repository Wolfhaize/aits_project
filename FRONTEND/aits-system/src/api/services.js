import { api } from './config';
export const IssueService ={
    getIssues:async () =>{
        try{
            console.log('Fetching issues');
            const response =await api.get('issues/');
            return response.data;
        }catch (error){
            console.error('Error fetching issues:', error);
            throw error;
        }
    },
    getIssueById: async (id) => {
        try {
            const response = await api.get(`issues/${id}/`);
            return response.data;
        }catch (error){
            console.error(`Error fetching issue ${id}:`, error);
            throw error;
        }
    },

    createIssue: async (issueData) => {
        try {
            const response = await api.post('issues/',issueData);
            return response.data;
        }catch (error){
            console.error('Error creating issue:',error);
            throw error;
        }
    },

    updateIssue: async (id, issueData) => {
        try {
            const response = await api.put(`issues/${id}/`, issueData);
            return response.data;
        } catch (error) {
            console.error(`Error updating issue ${id}:`, error);
            throw error;
        }
    },

    deleteIssue: async(id,) => {
        try{
            const response = await api.delete(`issues/${id}/`);
            return true;
        } catch (error){
            console.error(`Error deleting issue ${id}:`, error);
                throw error;
        }
    }
};

