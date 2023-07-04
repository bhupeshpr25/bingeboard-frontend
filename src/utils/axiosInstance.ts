import axios, { AxiosInstance, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://bingeboard.onrender.com/api",
});

// Set the token permanently for all requests
const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<{ token: string }>) => {
    const token = response.data.token;

    if (token) {
      localStorage.setItem("token", token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
