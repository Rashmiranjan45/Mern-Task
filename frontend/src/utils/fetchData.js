import axios from "axios";
import { server } from "./config";

export const getTransactions = (month, page = 1, search = "") => {
  return axios.get(`${server}/api/v1/product/transaction`, {
    params: { month, page, search },
  });
};

export const getStatistics = (month) => {
  return axios.get(`${server}/api/v1/product/statistics`, {
    params: { month },
  });
};

export const getBarChart = (month) => {
  return axios.get(`${server}/api/v1/product/bar-chart`, { params: { month } });
};

export const getPieChart = (month) => {
  return axios.get(`${server}/api/v1/product/pie-chart`, { params: { month } });
};
console.log(server)
export const getCombinedData = (month) => {
  return axios.get(`${server}/api/v1/product/allData`, { params: { month } });
};
