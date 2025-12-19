import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend server is running successfully",
  });
});

connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started http://localhost:${PORT}`);
});
