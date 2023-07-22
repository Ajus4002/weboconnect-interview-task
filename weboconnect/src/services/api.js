import axios from 'axios';

export const SERVER_BASE_URL = 'http://localhost:5000';
export const API_BASE_URL = SERVER_BASE_URL + '/api/user';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, formData);
    const { token } = response.data;
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const listUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const searchUsers = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { search: searchTerm },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const updateUserProfile = async (formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/profile`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const changeUserPassword = async (formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/change-password`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const deleteUserAccount = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete-account`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const uploadProfilePicture = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/upload-profile-pic`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const openUserList = async () => {
  window.open(`${API_BASE_URL}/`, '_blank');
}
