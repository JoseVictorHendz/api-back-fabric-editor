import { NextFunction, Request, Response } from "express";

export class TestController {
  constructor() {}

  public async getAll(request: Request, response: Response, next: NextFunction) {
    response.json("test working");
  }
}
