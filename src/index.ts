import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnection";

dotenv.config();

import blogRoute from "./routes/blog";
import { errorHandler, notFound } from "./middleware/errorHandler";
import { rateLimiterMiddleware } from "./middleware/rateLimter";
const PORT = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dbConnect();
app.use(rateLimiterMiddleware);
app.use("/api/blog", blogRoute);
app.use(notFound);
app.use(errorHandler);
app.use("/", (req, res) => {
  res.send("Hello im from server side");
});
app.listen(PORT, () => {
  console.log("Server is running at PORT", PORT);
});
