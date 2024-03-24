import axios from 'axios';

class AiDevsRestClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://tasks.aidevs.pl';
  }

  async getTaskToken(taskName) {
    if (!taskName) {
        throw new Error('Task name is required');
    }
    try {
      const response = await axios.post(`${this.baseURL}/token/${taskName}`, {
        apikey: this.apiKey
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  }

  async getTaskDescriptionById(taskToken) {
    if (!taskToken) {
        throw new Error('Task ID is required');
    }
    try {
      const response = await axios.get(`${this.baseURL}/task/${taskToken}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task with ID ${taskToken}:`, error);
      throw error;
    }
  }

  async postAnswer(id, answer) {
    if (!id || !answer) {
      throw new Error('Task ID and answer are required');
    }
    try {
      const response = await axios.post(`${this.baseURL}/answer/${id}`, answer);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`Error posting answer for task ID ${id}: Status code: ${error.response.status}, Body: ${JSON.stringify(error.response.data)}`);
        throw new Error(`Failed to post answer for task ID ${id}: Received status code ${error.response.status}`);
      } else {
        console.error(`Error posting answer for task ID ${id}:`, error.message);
        throw new Error(`Failed to post answer for task ID ${id}: ${error.message}`);
      }
    }
  }
}

export default AiDevsRestClient;
