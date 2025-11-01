import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import workRoutes from "./routes/index.js";
import emailRoutes from "./routes/email.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS origins from environment variables
const allowedOrigins = [
  process.env.LOCALHOST_URL,
  process.env.PRODUCTION_URL_ONE,
  process.env.PRODUCTION_URL_TWO
].filter(Boolean); // Remove any undefined values

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/", workRoutes);
app.use("/", emailRoutes);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
