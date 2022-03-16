import { Request, Response } from "express";

import { Controller } from "../Controller";

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    try {
      const requestData = {
        ...request.body,
        ...request.params,
        ...request.query,
        ...request.headers,
        userId: request.userId,
        userAdmin: request.isAdmin,
      };
  
      const httpResponse = await controller.handle(requestData);
  
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        return response.status(httpResponse.statusCode).json(httpResponse.body);
      } else {
        return response.status(httpResponse.statusCode).json({
          error: httpResponse.body.error
        });
      }
    } catch (err) {
      return response.status(500).json({
        message: err.message
      })
    }
  };
};
