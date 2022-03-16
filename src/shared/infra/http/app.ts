import "@/config/bootstrap";

import cors from "cors";
import morgan from "morgan";
import * as Sentry from "@sentry/node";
import cookieParser from "cookie-parser";
import uploadConfig from "@/config/upload";
import { logger } from "@/utils/logger";
import { routes } from "./routes";
import { AppError } from "./errors/AppErrors";
import express, { NextFunction, Request, Response } from "express";

Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();

app.use(cors({ origin: "*" }));

app.use(morgan("tiny"));

app.use(cookieParser());

app.use(
  express.json({
    type: ["application/json", "text/plain"],
    limit: "10mb",
  })
);

app.use(Sentry.Handlers.requestHandler());
app.use("/public", express.static(uploadConfig.directory));
app.get(
  "/api/test",
  (request: Request, response: Response, next: NextFunction) => {
    response.send({
      version: "0.0.1",
      lastUpdated: "2022-03-15 19:02",
    });
  }
);
app.use("/api", routes);

app.use(Sentry.Handlers.errorHandler());

app.use(async (err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    logger.warn(err);
    return res.status(err.statusCode).json({ error: err.message });
  }

  logger.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

export { app };
