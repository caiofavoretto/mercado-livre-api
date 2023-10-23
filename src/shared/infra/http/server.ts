import "reflect-metadata";
import "dotenv/config";

import { errors } from "celebrate";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

import AppError from "@shared/errors/AppError";

import routes from "./routes";
import swaggerFile from "./swagger.json";

import "@shared/container";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api", routes);

app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // if (err.response?.data) {
  //   console.error(err.response.data);
  // } else {
  //   console.error(err);
  // }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333");
});
