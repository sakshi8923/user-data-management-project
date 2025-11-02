import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const userService = {
  async getUsers() {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  async createUser(userData) {
    const response = await axios.post(API_BASE_URL, userData);
    return response.data;
  },

  async updateUser(id, userData) {
    const response = await axios.put(`${API_BASE_URL}/${id}`, userData);
    return response.data;
  },

  async deleteUser(id) {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },
};
