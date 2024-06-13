import axios from "axios";
import secureLocalStorage from "react-secure-storage";


//to run in production use this command, npm run start-prod
// secureLocalStorage.removeItem('xsrftoken');
// secureLocalStorage.removeItem('authtoken');

const htt = "https://";

//development version
//localhost version
export let midUrl = "localhost";
export const urlPort = "4000";
export let baseURL = `${htt}${midUrl}:${urlPort}`;

if (process.env.NODE_ENV === 'production') {
  midUrl = "api.zorsha.com.np";
  baseURL = `${htt}${midUrl}`;
}


// //production version
// export const midUrl = "api.zorsha.com.np";
// export const baseURL = `${htt}${midUrl}`;


//const baseURL = "https://api.zorsha.com.np"
//const token = localStorage.getItem("token");

//testing logger
// axios.interceptors.request.use(
//   (config) => {
//     console.log("Request:", config);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${secureLocalStorage.getItem('authtoken')}`,
    "xsrf-token": secureLocalStorage.getItem('xsrftoken')
  },
});


// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${secureLocalStorage.getItem('authtoken')}`;
    config.headers["xsrf-token"] = secureLocalStorage.getItem('xsrftoken');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.data.message);
    if (error.response && (error.response.status === 416 || error.response.status === 440 || error.response.status === 498 || error.response.status === 499 || error.response.status === 401 || error.response.status === 403)) {
      const keysToRemove = [
        "token",
        "Users",
        "user",
        "Metals",
        "Commodities",
        "Portfolios",
        "Assets"
      ];

      keysToRemove.forEach(key => localStorage.removeItem(key));
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export const FetchXSRFToken = () => api.get("/api/user/csrf-token").then((response) => {
  //  api.defaults.headers['xsrf-token'] = response.data.token;
  secureLocalStorage.removeItem('xsrftoken');
  secureLocalStorage.setItem('xsrftoken', response.data.token);
});

export const RegisterUser = (data) => api.post("/api/user/create", data);

export const verifyEmail = (data) => api.post("/api/user/verifyemail", data);
export const verifyName = (data) => api.post("/api/user/verifyname", data);
export const verifyPassword = (data) => api.post("/api/user/verifyPassword", data);
export const verifyPhone = (data) => api.post("/api/user/verifyphone", data);

export const loginUser = (data) => api.post("/api/user/login", data).then((response) => {
  const token = response.data.data.token;
  secureLocalStorage.removeItem('authtoken');
  secureLocalStorage.setItem("authtoken", token);
  return response;
});

export const getAllAssets = () => api.get("/api/sharesansardata");

export const getMetals = (id) => api.get(`/api/metal`);

export const getStockInfo = (symbol) => api.get(`/api/singlesharesansardata?symbol=${symbol}`);

export const getCommo = (id) => api.get(`/api/commodity`);

export const getAllUsers = () => api.get("/api/admin/allusers");

export const getUserLogs = () => api.get("/api/admin/fetchuserlogs");

export const deleteUser = (deletingUser) => {
  const apiEndpoint = baseURL + "/api/deleteUser";

  const requestBody = {
    email: deletingUser,
  };
  return axios
    .delete(apiEndpoint, { data: requestBody })
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

  const requestBody = {
    email: userid,
    field: field,
    value: value,
  };

  return axios
    .put(endpoint, requestBody)
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

// export const getPortfolio = () => {
//   return api.get(`/api/getallportforuser`);
// };

export const getPortfolio = () => api.get(`/api/user/getallportforuser`);

export const renamePortfolio = (data) => {
  return api.post(`/api/user/renameportfolio`, data);
};

export const getWatchlist = (email) => {
  const data = { email: email };

  return api.post(`/api/user/getwatchlist`, data);
};

export const createWatchlist = (email, name) => {
  const data = { email: email, name: name };

  return api.post(`/api/user/createwatchlist`, data);
};

export const deleteWatchlist = (email, watchlistId) => {
  const data = { email: email, watchlistId: watchlistId };

  return api.post(`/api/user/deletewatchlist`, data);
};

export const renameWatchlist = (email, watchlistId, newName) => {
  const data = { watchlistId: watchlistId, email: email, newName: newName };

  return api.post(`/api/user/renamewatchlist`, data);
};

export const addStockToWatchlist = (email, watchlistId, stockSymbol) => {
  const data = {
    email: email,
    watchlistId: watchlistId,
    stockSymbol: stockSymbol,
  };

  return api.post(`/api/user/addstocktowatchlist`, data);
};

export const removeStockFromWatchlist = (email, watchlistId, stockSymbol) => {
  const data = {
    email: email,
    watchlistId: watchlistId,
    stockSymbol: stockSymbol,
  };

  return api.post(`/api/user/remstockfromwatchlist`, data);
};

export const updateUser = (data) => api.post(`/api/user/updateAllUserData`, data);

export const updateDPImage = (data) => {
  return api.post(`/api/user/updateprofilepic`, data);
};

export const createPortfolio = (email, name) => {
  const data = { email: email, name: name };

  return api.post(`/api/user/newport`, data);
};

export const deletePortfolio = async (data) => {
  return api.delete("/api/user/delport", { data });
};

export const addStockToPortfolio = (data) => {
  return api.post(`/api/user/addstock`, data);
};

export const removeStockFromPortfolio = (data) => {
  return api.post(`/api/user/remstock`, data);
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
