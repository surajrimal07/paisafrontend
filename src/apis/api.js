import axios from "axios";
import { v4 as uuidv4 } from 'uuid';



//create a seperate file for all api urls


//creating headers for all api calls
const config = {
  headers: {
  'authorization': `Bearer  ${localStorage.getItem('token')}`
  }}



const api = axios.create({
    //baseURL: "http://localhost:5000",
    baseURL: "https://paisabackend.el.r.appspot.com",

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

const updateAsset = async (token, dpimage, field, code) => {
  const requestData = {
    token: token,
    dpimage: dpimage,
    field: field,
    code: code,
  };

  try {
    const response = await api.post('/api/update-asset', requestData, config);

    if (response.status === 200) {
      console.log('Update successful:', response.data);
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
      return { status: 500, error: 'An error occurred during asset update.' };
    } else {
      console.error('API Request Setup Error:', error.message);
      return { status: 500, error: 'An error occurred during asset update.' };
    }
  }
};


const getAllAssets = async () => {
  try {
    const response = await api.post('/api/sharesansardata');

    if (response.status === 200) {
      localStorage.setItem('assetsData', JSON.stringify(response.data));
      return { status: 200, data: response.data };
    } else {
      console.error('Unhandled status code:', response.status);
      return { status: response.status, error: 'An unexpected error occurred.' };
    }
  } catch (error) {
    return { status: 500, error: 'An error occurred while fetching assets.' };
  }
};

const getAllUsers = async () => {
  try {
    const response = await api.post('/api/allusers');

    if (response.status === 200) {
      localStorage.setItem('userlistData', JSON.stringify(response.data));
      return { status: 200, data: response.data.users };
    } else {
      console.error('Unhandled status code:', response.status);
      return { status: response.status, error: 'An unexpected error occurred.' };
    }
  } catch (error) {
    return { status: 500, error: 'An error occurred while fetching assets.' };
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

export { RegisterUser as default, getAllAssets, getAllUsers, loginUser, updateAsset };

