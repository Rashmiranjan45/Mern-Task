import { fetchData } from "../utils/fetchData.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

fetchData()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });
