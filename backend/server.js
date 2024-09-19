// We need to do this so that our environment variables are guaranteed to be loaded before any code execution in this file or in other files
import "../config.js";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import errorHandlerMiddleware from "./middleware/error-handler.middleware.js";

const app = express();
app.use(cookieParser());

// Gives us posted values on req.body
app.use(express.json());

// Logging for development
if (process.env.NODE_ENV === "development") {
  console.log("starting logging");
  app.use(morgan("dev"));
}

app.post("/api/auth/test", (req, res) => {
  console.log(req.body);
  res.status(500).send("<h1>Live</h1>");
});

app.use("/api/auth", authRouter);

app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(process.env.PORT || 3000);
} catch (error) {
  console.log(error);
  process.exit(1);
}
