import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import postRoutes from "./src/routes/post.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend server is running successfully",
  });
});

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started http://localhost:${PORT}`);
});
