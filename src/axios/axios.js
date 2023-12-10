import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const requestHandler = (request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  } else {
    localStorage.clear();
    window.location.href = "/auth/signin";
    return Promise.reject("No token available");
  }
};

const responseHandler = (response) => {
  // if (response.data.code === 200 || response.data.code === 201) {
  return response;
  // } else {
  //   console.log(response);
  // }
};

const errorHandler = (error) => {
  //   if (error?.response?.status === 403) {
  //     localStorage.clear();
  //     window.location.href = "/auth/signin";
  //   }
  //   console.log("error", error);
  return error;
};

axiosInstance.interceptors.request.use((request) => {
  return requestHandler(request);
});

axiosInstance.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);
