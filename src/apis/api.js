import axios from "axios";
import { v4 as uuidv4 } from 'uuid';



//create a seperate file for all api urls


const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
});

export const createAPI = (data) => api.post("/api/create",data);


const loginUser = async (email, password) => {
  const requestData = {
    email: email,
    password: password,
  };

  try {
    const response = await api.post('/api/login', requestData);

    if (response.status === 200) {
      console.log('Login successful:', response.data);
      return { status: 200, data: response.data };
    } else {
      console.error('Unhandled status code:', response.status);
      return { status: response.status, error: 'An unexpected error occurred.' };
    }
  } catch (error) {
    if (error.response) {
      console.error('API Response Error:', error.response.status, error.response.data);
      return { status: error.response.status, error: error.response.data.error };
    } else if (error.request) {
      console.error('API Request Error: No response received');
      return { status: 500, error: 'An error occurred during login.' };
    } else {
      console.error('API Request Setup Error:', error.message);
      return { status: 500, error: 'An error occurred during login.' };
    }
  }
};

const RegisterUser = async (name, phone, email, password) => {
  const originalToken = uuidv4();
  const uniqueToken = originalToken.replace(/-/g, '');

  const requestData = {
    name: name,
    phone: phone,
    email: email,
    password: password,
    token: uniqueToken,
  };

  console.log('Registering with:', requestData);

  try {
    const response = await api.post('/api/create', requestData);
    return response.status;
  } catch (error) {
    console.error('API Request Error:', error.message);

    if (error.response) {
      return error.response.status;
    } else {
      throw error;
    }
  }
};

export { RegisterUser as default, loginUser };

