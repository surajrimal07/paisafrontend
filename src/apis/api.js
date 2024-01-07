import axios from "axios";

//const baseURL = "http://localhost:5000";
const baseURL = "https://paisabackend.el.r.appspot.com"
const token = localStorage.getItem('token');

//testing logger
axios.interceptors.request.use((config) => {
  console.log('Request:', config);
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
}, (error) => {
  return Promise.reject(error);
});


//



const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    //'Authorization': `Bearer ${token}`,
   // 'Content-Type': 'application/json',
    "Content-Type" : "multipart/form-data",
  },
});

//seperate header for auth

const config = {
    headers : {
        'authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
}

// const handleApiCall = async (apiCall) => {
//   try {
//     const response = await apiCall();
//     console.log('Response status:', response.status);
//     console.log('Response data:', response.data);
//     return { status: response.status, data: response.data };
//   } catch (error) {
//     console.error('API Error:', error);
//     if (error.response) {
//       return { status: error.response.status, error: error.response.data.error || 'An unexpected error occurred.' };
//     } else if (error.request) {
//       return { status: 500, error: 'An error occurred: No response received' };
//     } else {
//       return { status: 500, error: `An error occurred: ${error.message}` };
//     }
//   }
// };
//const createAPI = (endpoint, data) => handleApiCall(() => api.post(endpoint, data));

export const RegisterUser = (data) => api.post('/api/create', data)
// {
//   console.log('Registering with:', data);
//   return createAPI("/api/create", data);
// }

export const loginUser =  (data) =>  api.post('/api/login', data)


// export const loginUser = async (email, password) => {
//   const requestData = { email, password };
//   return createAPI('/api/login', requestData);
// };

// export const updateAsset = (token, dpimage, field, code) => {
//   const requestData = { token, dpimage, field, code };
//   return createAPI('/api/update-asset', requestData);
// };

export const getAllAssets = () =>  api.post('/api/sharesansardata');

export const getAllUsers = () =>  api.get('/api/allusers', config);

//export const deleteUser = (data) => api.delete(`/api/deleteUser`,data, config);

export const deleteUser = (deletingUser) => {
  const apiEndpoint = 'http://localhost:5000/api/deleteUser';
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const requestBody = {
    email: deletingUser,
  };
  return axios.delete(apiEndpoint, { data: requestBody, ...config })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(`Error making DELETE request to: ${apiEndpoint}`, error.response ? error.response.data : error.message);
      throw error;
    });
};

export const updateUser = (id, data) => api.put(`/api/updateuser/${id}`, data, config);