import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import productRouter from "./router/products";
const categoryRouter = require("./router/categories");
const authRouter = require("./router/auth");
const userRouter = require("./router/user");
import ExpressValidator from "express-validator";
import cors from "cors";

const app = express();
dotenv.config();

app.use(ExpressValidator())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors({ creadentials: "same-origin" }));
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

mongoose
  .connect(
    process.env.MONGO_URI,
    { userFindAndModify: false },
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);