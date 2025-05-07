import axios from "axios";

axios.defaults.baseURL = "https://storyhubs-api-4e038dae39bb.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

axiosReq.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken"); // or sessionStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );