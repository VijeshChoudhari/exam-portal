import axios from "axios";
import { axiosInstance } from "./axios";

export const signUp = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}user/signup`,
    data
  );
};

export const login = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}user/login`,
    data
  );
};

export const verifyEmail = async (token) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}user/verifyEmail/${token}`
  );
};

export const getAllSubject = async () => {
  return await axiosInstance.post("subject/get-all", {
    search: "",
    currentPage: 1,
    limit: 100,
  });
};

export const requestTest = async (data) => {
  return await axiosInstance.post("testRequest/create", data);
};

export const testRequestInfo = async (testRequestId) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}testRequest/testRequest-info/${testRequestId}`
  );
};

export const getStartTestToken = async (testRequestId) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}testRequest/startTest/${testRequestId}`
  );
};

export const isValidLink = async (token) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}testRequest/testLink-status`,
    { token: token }
  );
};

export const getTestQuestions = async (testId) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}test/test-questions/${testId}`
  );
};

export const createReport = async (data) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}resport/create`,
    data
  );
};
