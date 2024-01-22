import axios from "axios";

const baseURL = "http://localhost:5000";
//const baseURL = "https://paisabackend.el.r.appspot.com"
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

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Authorization': `Bearer ${token}`,
   'Content-Type': 'application/json',
    //"Content-Type" : "multipart/form-data",
  },
});

//seperate header for auth

const config = {
    headers : {
        'authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
}

export const RegisterUser = (data) => api.post('/api/create', data)

export const loginUser =  (data) =>  api.post('/api/login', data)

export const getAllAssets = () =>  api.get('/api/sharesansardata');

export const getMetals = (id) =>  api.get(`/api/metal`);

export const getCommo = (id) =>  api.get(`/api/commodity`);

export const getAllUsers = () =>  api.get('/api/allusers', config);

export const deleteUser = (deletingUser) => {
  const apiEndpoint = baseURL + '/api/deleteUser';;
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


//json for edit user
// {
//   "email": "suraj@rimal.com",
//   "field": "password",
//   "value": "000000"
// }

export const editUser = (userid, field,value) => {
  const endpoint = baseURL + '/api/updateuser';

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const requestBody = {
    email: userid,
    field: field,
    value: value
  };

  return axios.put(endpoint, requestBody, config)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(`Error making POST request to: ${endpoint}`, error.response ? error.response.data : error.message);
      throw error;
    });
};

export const getIndex = () =>  api.get(`/api/index`);


export const getNews = (page = 1, limit = 10) => {
  const url = `/news?_page=${page}&limit=${limit}`;
  return api.get(url);
};

export const getDashboardItems = () =>  api.get(`/api/dashboard`);

export const otpLogin = (email) =>  api.post(`/api/otp-login`, email);

export const otpVerify = (data) =>  api.post(`/api/otp-verify`, data);

export const otpResend = (email) =>  api.post(`/api/otp-resend`, email);

//forget part

export const forgetPassword = (email) =>  api.post(`/api/forget`, email);

//save new password
export const savePassword = (data) =>  api.post(`/api/updateuser`, data);

//get all portfolio

export const getPortfolio = (email) => {
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`,
  //   },
  // };
  const data = { email: email };

  return api.post(`/api/getallportforuser`, data, config);
};