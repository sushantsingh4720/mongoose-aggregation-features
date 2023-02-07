import express from "express";
import { config } from "dotenv";

import dbConnect from "./config/dbConnect.js";
import productsRoute from "./routes/productsRoute.js";

const app = express();

config();
dbConnect();
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});
app.use("/api", productsRoute);

const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log(`listening on port http://localhost:${port}`);
});
