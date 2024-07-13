import { Router } from "express";
import { getAllTransaction, getBarChart, getCombinedData, getPieChart, getStatistics } from "../controller/product.controller.js";


const router = Router()

router.route("/transaction").get(getAllTransaction)
router.route("/statistics").get(getStatistics)
router.route("/bar-chart").get(getBarChart)
router.route("/pie-chart").get(getPieChart)
router.route("/allData").get(getCombinedData)

export default router