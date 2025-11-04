import { NextFunction, Request, RequestHandler, Response } from "express";

export const RequestHandlerCustom = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.resolve(handler(req, res, next));
    } catch (error) {
      console.error(">>> ", error);
      next(error);
    };
  };
};

export const HandlerCustom = <T extends (...args: any[]) => any>(handler: T) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error(">>> ", error);
      throw error;
    };
  };
};

export class ErrorCustom extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
