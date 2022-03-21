import { adaptMiddleware } from "@/core/infra/adpters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { makeEnsureAuthenticatedMiddleware } from "@/shared/infra/http/factories/middlewares/EnsureAuthenticatedMiddlewareFactory";
import { Router } from "express";
import { makeAddMethodPaymentsUserController } from "../factories/AddMethodPaymentsUserControllerFactory";

const paymentsRoutes = Router();

paymentsRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()));

paymentsRoutes.post(
  "/add-payment-method",
  adaptRoute(makeAddMethodPaymentsUserController())
);

export { paymentsRoutes };
