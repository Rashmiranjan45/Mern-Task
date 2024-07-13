import express from "express";
import cors from "cors"
import productRouter from "../routes/products.routes.js"


const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN,"http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// routes
app.use("/api/v1/product",productRouter)


export { app };
