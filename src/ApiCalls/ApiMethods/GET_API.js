import axios from 'axios'

const GET_API = async ({ url }) => {
    try {
        const response = await axios({
          url: url,
          method: 'GET'
        //   data: data
        });
    
        // Return the response data
        return response.data;
      } catch (error) {
        // Handle any errors
        console.error('API Error:',url, error);
    
        // Rethrow the error to be caught by the caller
        throw error;
      }
}

export default GET_API
