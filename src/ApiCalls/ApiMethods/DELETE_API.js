import axios from 'axios'

const DELETE_API = async ({ url }) => {
    try {
        const response = await axios({
          url: url,
          method: 'DELETE'
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

export default DELETE_API
