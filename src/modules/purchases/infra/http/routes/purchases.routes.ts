import { adaptMiddleware } from "@/core/infra/adpters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { makeEnsureAuthenticatedMiddleware } from "@/shared/infra/http/factories/middlewares/EnsureAuthenticatedMiddlewareFactory";
import { Router } from "express";
import { makeCreateNewPurchaseOrderController } from "../factories/CreateNewPurchaseOrderControllerFactory";

const purchasesRoutes = Router();

purchasesRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()));

purchasesRoutes.post("/", adaptRoute(makeCreateNewPurchaseOrderController()));

purchasesRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware(true)));

export { purchasesRoutes };
