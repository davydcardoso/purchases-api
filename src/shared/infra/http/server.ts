import gracefulShutdown from "http-graceful-shutdown";
import { logger } from "@/utils/logger";
import { app } from "./app";

const server = app.listen(process.env.API_PORT, () => {
  logger.info(`Server started on port: ${process.env.API_PORT}`);
});

gracefulShutdown(server);
