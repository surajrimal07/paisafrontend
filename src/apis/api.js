import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
});

export const createAPI = (data) => api.post("/api/create",data);

const RegisterUser = async (name, phone, email, password) => {
    const uniqueToken = uuidv4();

    const requestData = {
      name: name,
      phone: phone,
      email: email,
      password: password,
      token: uniqueToken,
    };

    try {
      const response = await api.post('/api/create', requestData);
      console.log("test")
        console.log(response)
      if (response.status === 200) {
        console.log('Registration successful:');
        return { status: 'success' };
      } else if (response.status === 400){
        console.error('Duplicate Data');
        return { status: 'duplicate', data: response.data };
      } else if ( response.status === 500){
        console.error('Registration failed. Server returned:', response.status, response.data);
        return { status: 'failed', data: response.data };
      }
    } catch (error) {
      console.error('API Request Error:', error.message);
      return { status: 'failed', error: error.message };
    }
  };


export default RegisterUser;
