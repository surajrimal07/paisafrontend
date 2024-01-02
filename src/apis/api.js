// // import axios from "axios";



// // //create a seperate file for all api urls


// // //creating headers for all api calls
// // const config = {
// //   headers: {
// //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //     'Content-Type': 'application/json',
// //   }
// // };



// // const api = axios.create({
// //     baseURL: "https://paisabackend.el.r.appspot.com",

// //     withCredentials: true,
// //     headers: {
// //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //         'Content-Type': 'application/json'
// //     },
// // });

// // export const createAPI = (data) => api.post("/api/create",data);


// // const loginUser = async (email, password) => {
// //   const requestData = {
// //     email: email,
// //     password: password,
// //   };

// //   try {
// //     const response = await api.post('/api/login', requestData);

// //     if (response.status === 200) {
// //       console.log('Login successful:', response.data);
// //       return { status: 200, data: response.data };
// //     } else {
// //       console.error('Unhandled status code:', response.status);
// //       return { status: response.status, error: 'An unexpected error occurred.' };
// //     }
// //   } catch (error) {
// //     if (error.response) {
// //       console.error('API Response Error:', error.response.status, error.response.data);
// //       return { status: error.response.status, error: error.response.data.error };
// //     } else if (error.request) {
// //       console.error('API Request Error: No response received');
// //       return { status: 500, error: 'An error occurred during login.' };
// //     } else {
// //       console.error('API Request Setup Error:', error.message);
// //       return { status: 500, error: 'An error occurred during login.' };
// //     }
// //   }
// // };

// // const updateAsset = async (token, dpimage, field, code) => {
// //   const requestData = {
// //     token: token,
// //     dpimage: dpimage,
// //     field: field,
// //     code: code,
// //   };

// //   try {
// //     const response = await api.post('/api/update-asset', requestData, config);

// //     if (response.status === 200) {
// //       console.log('Update successful:', response.data);
// //       return { status: 200, data: response.data };
// //     } else {
// //       console.error('Unhandled status code:', response.status);
// //       return { status: response.status, error: 'An unexpected error occurred.' };
// //     }
// //   } catch (error) {
// //     if (error.response) {
// //       console.error('API Response Error:', error.response.status, error.response.data);
// //       return { status: error.response.status, error: error.response.data.error };
// //     } else if (error.request) {
// //       console.error('API Request Error: No response received');
// //       return { status: 500, error: 'An error occurred during asset update.' };
// //     } else {
// //       console.error('API Request Setup Error:', error.message);
// //       return { status: 500, error: 'An error occurred during asset update.' };
// //     }
// //   }
// // };


// // const getAllAssets = async () => {
// //   try {
// //     const response = await api.post('/api/sharesansardata');

// //     if (response.status === 200) {
// //       localStorage.setItem('assetsData', JSON.stringify(response.data));
// //       return { status: 200, data: response.data };
// //     } else {
// //       console.error('Unhandled status code:', response.status);
// //       return { status: response.status, error: 'An unexpected error occurred.' };
// //     }
// //   } catch (error) {
// //     return { status: 500, error: 'An error occurred while fetching assets.' };
// //   }
// // };

// // const getAllUsers = async () => {
// //   try {
// //     console.log("config is ",config);
// //     const response = await api.post('/api/allusers',config);

// //     if (response.status === 200) {
// //       console.log( "Raw data is ",response.data.data);
// //       localStorage.setItem('userlistData', JSON.stringify(response.data));
// //       return { status: 200, data: response.data };
// //     } else {
// //       console.error('Unhandled status code:', response.status);
// //       return { status: response.status, error: 'An unexpected error occurred.' };
// //     }
// //   } catch (error) {
// //     console.error('Error fetching assets:', error);
// //     return { status: 500, error: 'An error occurred while fetching assets.' };
// //   }
// // };



// // const RegisterUser = async (name, phone, email, password) => {

// //   const requestData = {
// //     name: name,
// //     phone: phone,
// //     email: email,
// //     password: password,
// //   };

// //   console.log('Registering with:', requestData);

// //   try {
// //     const response = await api.post('/api/create', requestData);
// //     return response.status;
// //   } catch (error) {
// //     console.error('API Request Error:', error.message);

// //     if (error.response) {
// //       return error.response.status;
// //     } else {
// //       throw error;
// //     }
// //   }
// // };

// // export { RegisterUser as default, getAllAssets, getAllUsers, loginUser, updateAsset };

// import axios from "axios";

// //const baseURL = "https://paisabackend.el.r.appspot.com";

// //localhost base
// const baseURL = "http://localhost:5000";
// //const token = localStorage.getItem('token');

// export const RegisterUser = (name, phone, email, password) => {
//   const requestData = {
//     name,
//     phone,
//     email,
//     password,
//   };

//   console.log('Registering with:', requestData);

//   return handleApiResponse(() => api.post('/api/create', requestData));
// };


// //register
// const api = axios.create({
//   baseURL,
//   withCredentials: true,
//   headers: {
//     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//     //'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   },
// });

// const handleApiResponse = async (apiCall) => {
//  // try {
//     const response = await apiCall();
//     console.log('response status is ',response.status);
//     console.log('response data is ',response.data);
//     return {response };

//     // if (response.status === 200 || response.status === 201 || response.status === 202) {
//     //   return { status: response.status, data: response.data };
//     // } else if (response.status === 400){
//     //   console.log('test error');
//     //   console.error('Error:', response.status);
//     //   return { status: response.status, error: 'Email or Phone number exists' };
//     // } else {
//     //   console.error('Unhandled status code:', response.status);
//     //   return { status: response.status, error: 'An unexpected error occurred.' };
//     // }


//     //test
//   // } catch (error) {
//   //   if (error.response) {
//   //     console.error('API Response Error:', error.response.status, error.response.data);
//   //     return { status: error.response.status, error: error.response.data.error };
//   //   } else if (error.request) {
//   //     console.error('API Request Error: No response received');
//   //     return { status: 500, error: `An error occurred: ${error.message}` };
//   //   } else {
//   //     console.error('API Request Setup Error:', error.message);
//   //     return { status: 500, error: `An error occurred: ${error.message}` };
//   //   }
//   // }
// };

// export const createAPI = (data) => handleApiResponse(() => api.post("/api/create", data));



// //login
// export const loginUser = async (email, password) => {
//   const requestData = {
//     email,
//     password,
//   };

//   return handleApiResponse(() => api.post('/api/login', requestData));
// };

// export const updateAsset = (token, dpimage, field, code) => {
//   const requestData = {
//     token,
//     dpimage,
//     field,
//     code,
//   };

//   return handleApiResponse(() => api.post('/api/update-asset', requestData));
// };

// export const getAllAssets = () => handleApiResponse(() => api.post('/api/sharesansardata'));

// export const getAllUsers = () => handleApiResponse(() => api.post('/api/allusers'));


import axios from "axios";

const baseURL = "http://localhost:5000";
const token = localStorage.getItem('token');

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

  console.log(`Making DELETE request to: ${apiEndpoint}`);

  return axios.delete(apiEndpoint, { data: deletingUser, ...config })
    .then(response => {
      // Log successful response if needed
      console.log(`DELETE request successful for: ${apiEndpoint}`);
      return response;
    })
    .catch(error => {
      // Log error details
      console.error(`Error making DELETE request to: ${apiEndpoint}`, error.response ? error.response.data : error.message);
      throw error;
    });
};

export const updateUser = (id, data) => api.put(`/api/updateuser/${id}`, data, config);