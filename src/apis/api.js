import axios from "axios";

//to run in production use this command, npm run start-prod

const baseURL = "https://localhost:4000";
//const baseURL = "https://api.zorsha.com.np"
const token = localStorage.getItem("token");

//testing logger
axios.interceptors.request.use(
  (config) => {
    console.log("Request:", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

const config = {
  headers: {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

export const RegisterUser = (data) => api.post("/api/user/create", data);

export const verifyEmail = (data) => api.post("/api/user/verifyemail", data);
export const verifyName = (data) => api.post("/api/user/verifyname", data);
export const verifyPassword = (data) => api.post("/api/user/verifyPassword", data);
export const verifyPhone = (data) => api.post("/api/user/verifyphone", data);

export const loginUser = (data) => api.post("/api/user/login", data);

export const getAllAssets = () => api.get("/api/sharesansardata");

export const getMetals = (id) => api.get(`/api/metal`);

export const getCommo = (id) => api.get(`/api/commodity`);

export const getAllUsers = () => api.get("/api/admin/allusers", config);

export const getUserLogs = () => api.get("/api/admin/fetchuserlogs", config);

export const deleteUser = (deletingUser) => {
  const apiEndpoint = baseURL + "/api/deleteUser";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const requestBody = {
    email: deletingUser,
  };
  return axios
    .delete(apiEndpoint, { data: requestBody, ...config })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(
        `Error making DELETE request to: ${apiEndpoint}`,
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const editUser = (userid, field, value) => {
  const endpoint = baseURL + "/api/user/updateuser";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const requestBody = {
    email: userid,
    field: field,
    value: value,
  };

  return axios
    .put(endpoint, requestBody, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(
        `Error making POST request to: ${endpoint}`,
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const getIndex = () => api.get(`/api/index`);

export const getNews = (page = 1, limit = 10) => {
  const url = `/news?_page=${page}&limit=${limit}`;
  return api.get(url);
};

export const getDashboardItems = () => api.get(`/api/dashboard`);

export const otpLogin = (email) => api.post(`/api/user/otp-login`, email);

export const otpVerify = (data) => api.post(`/api/user/otp-verify`, data);

export const otpResend = (email) => api.post(`/api/user/otp-resend`, email);

export const forgetPassword = (email) => api.post(`/api/user/forget`, email);

export const savePassword = (data) => api.post(`/api/user/updateuser`, data);

export const getPortfolio = (email) => {
  const data = { email: email };

  return api.post(`/api/getallportforuser`, data, config);
};

export const renamePortfolio = (data) => {
  return api.post(`/api/renameportfolio`, data);
};

export const getWatchlist = (email) => {
  const data = { email: email };

  return api.post(`/api/getwatchlist`, data);
};

export const createWatchlist = (email, name) => {
  const data = { email: email, name: name };

  return api.post(`/api/createwatchlist`, data);
};

export const deleteWatchlist = (email, watchlistId) => {
  const data = { email: email, watchlistId: watchlistId };

  return api.post(`/api/deletewatchlist`, data);
};

export const renameWatchlist = (email, watchlistId, newName) => {
  const data = { watchlistId: watchlistId, email: email, newName: newName };

  return api.post(`/api/renamewatchlist`, data);
};

export const addStockToWatchlist = (email, watchlistId, stockSymbol) => {
  const data = {
    email: email,
    watchlistId: watchlistId,
    stockSymbol: stockSymbol,
  };

  return api.post(`/api/addstocktowatchlist`, data);
};

export const removeStockFromWatchlist = (email, watchlistId, stockSymbol) => {
  const data = {
    email: email,
    watchlistId: watchlistId,
    stockSymbol: stockSymbol,
  };

  return api.post(`/api/remstockfromwatchlist`, data);
};

export const updateUser = (data) => api.post(`/api/user/updateAllUserData`, data);

export const updateDPImage = (data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return api.post(`/api/user/updateprofilepic`, data, config);
};

export const createPortfolio = (email, name) => {
  const data = { email: email, name: name };

  return api.post(`/api/newport`, data, config);
};

export const deletePortfolio = async (data) => {
  return api.delete("/api/delport", { data });
};

export const addStockToPortfolio = (data) => {
  return api.post(`/api/addstock`, data);
};

export const removeStockFromPortfolio = (data) => {
  return api.post(`/api/remstock`, data);
};

export const getAllPortfolios = () => {
  return api.get(`/api/admin/allportfolios`);
};

export const getNrbdata = () => {
  return api.get(`/api/combinednrbdata?refresh=false`);
};

export const getWorlddata = () => {
  return api.get(`/api/worldmarketdata?refresh=false`);
};

export const getIndexDataforCharts = () => {
  return api.get(`/api/getcompanyohlc?company=nepse`);
};
