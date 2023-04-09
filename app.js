import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import { routes } from "./routes.js";
const password = encodeURIComponent("Indhu@123");
const app = express();

app.use(express.json());
app.use(cors());

const databaseUrl = `mongodb+srv://Indhuprakash:${password}@cluster0.tkqqirb.mongodb.net/test`;
mongoose.connect(databaseUrl);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log("Error while connecting to database");
});

database.once("connected", () => {
  console.log("Connected to database successfully");
});

app.use(routes);

app.get("/healthcheck", (req, res) => {
  res.send("Server is up and running");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});