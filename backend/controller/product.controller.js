import { productData } from "../utils/fetchData.js";
import axios from "axios";

//GET-TRANSACTION
const getAllTransaction = (req, res) => {
  const { search, page = 1, perPage = 10 } = req.query;
  let filteredData = productData;

  if (search) {
    const regex = new RegExp(search, "i");
    filteredData.filter(
      (item) =>
        regex.test(item.title) ||
        regex.test(item.description) ||
        regex.test(item.price)
    );
  }

  const paginatedData = filteredData.slice(
    (page - 1) * perPage,
    page * perPage
  );
  return res.status(200).json({ data: paginatedData });
};

// GET-STATISTICS
const getStatistics = (req, res) => {
  const { month } = req.query;
  const monthIndex = parseInt(month, 10) - 1;

  const filteredData = productData.filter(
    (item) => new Date(item.dateOfSale).getMonth() === monthIndex
  );
  const totalSale = filteredData.reduce((acc, item) => acc + item.price, 0);
  const soldItems = filteredData.filter((item) => item.sold).length;
  const notSoldItems = filteredData.filter((item) => !item.sold).length;

  return res.status(200).json({ totalSale, soldItems, notSoldItems });
};

//GET- BARCHART
const getBarChart = (req, res) => {
  const { month } = req.query;
  const monthIndex = parseInt(month, 10) - 1;

  const filteredData = productData.filter(
    (item) => new Date(item.dateOfSale).getMonth() === monthIndex
  );
  const priceRanges = [
    0,
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    Infinity,
  ];
  const barChartData = priceRanges
    .map((range, index, arr) => {
      if (index === arr.length - 1) return null;
      const count = filteredData.filter(
        (item) => item.price >= range && item.price < arr[index + 1]
      ).length;
      return { range: `${range}-${arr[index + 1] - 1}`, count };
    })
    .filter((item) => item !== null);

  return res.status(200).json(barChartData);
};

//GET - PIECHART
const getPieChart = (req, res) => {
  const { month } = req.query;
  const monthIndex = parseInt(month, 10) - 1;

  const filteredData = productData.filter(
    (item) => new Date(item.dateOfSale).getMonth() === monthIndex
  );
  const pieChartData = filteredData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return res.status(200).json(
    Object.entries(pieChartData).map(([category, count]) => ({
      category,
      count,
    }))
  );
};

//GET - Combined Data
const getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      axios.get(`${process.env.BASE_URL}/transaction`, {
        params: { month },
      }),
      axios.get(`${process.env.BASE_URL}/statistics`, {
        params: { month },
      }),
      axios.get(`${process.env.BASE_URL}/bar-chart`, {
        params: { month },
      }),
      axios.get(`${process.env.BASE_URL}/pie-chart`, {
        params: { month },
      }),
    ]);

    return res.status(200).json({
      transactions: transactions.data,
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    });
  } catch (error) {
    console.error("Error fetching combined data:", error.message);
    return res.status(500).json({
      error: "Failed to fetch combined data. Please try again later.",
    });
  }
};

export {
  getAllTransaction,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
};
