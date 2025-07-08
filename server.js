import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/utils/db.js";
import authRoutes from "./src/routes/auth/auth.routes.js";
import postRoutes from "./src/routes/post/post.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors(
    {
      origin: process.env.FRONTEND_URL || "http://localhost:5173", // default Vite port
      credentials: true,
    } // Allow credentials for cookies, authorization headers, or TLS client certificates
  )
);
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
