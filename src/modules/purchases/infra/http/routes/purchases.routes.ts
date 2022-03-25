import { adaptMiddleware } from "@/core/infra/adpters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@/core/infra/adpters/ExpressRouteAdapter";
import { makeEnsureAuthenticatedMiddleware } from "@/shared/infra/http/factories/middlewares/EnsureAuthenticatedMiddlewareFactory";
import { Router } from "express";
import { makeCreateNewPurchaseOrderController } from "../factories/CreateNewPurchaseOrderControllerFactory";
import { makeGetAllPurchaseOrderController } from "../factories/GetAllPurchaseOrderControllerFactory";
import { makeGetMyListPurchasesController } from "../factories/GetMyListPurchasesControllerFactory";
import { makeGetPurchaseOrderController } from "../factories/GetPurchaseOrderControllerFactory";

const purchasesRoutes = Router();

purchasesRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()));

purchasesRoutes.post("/", adaptRoute(makeCreateNewPurchaseOrderController()));

purchasesRoutes.get("/", adaptRoute(makeGetPurchaseOrderController()));

purchasesRoutes.get("/my-list", adaptRoute(makeGetMyListPurchasesController()));

purchasesRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware(true)));

purchasesRoutes.get("/all", adaptRoute(makeGetAllPurchaseOrderController()));

export { purchasesRoutes };
