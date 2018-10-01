import { NextFunction, Request, Response } from "express";
import { PageRepository } from "../Repository/Page-Repository";
import * as Uuid from "uuid";
import { Page } from "../Models/Page";

const repository = new PageRepository()

export class PageController {
    constructor() {}    
    
    public async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            await repository.getAll().then(data => response.json(data));
        } catch (err) {
          next(err);
        }
    }

    public async getOne(request: Request, response: Response, next: NextFunction) {
        const _id = request.params._id
        const user = await repository.getOne(_id)
        response.json(user)
    }

    public async create(request: Request, response: Response, next: NextFunction) {
        try {
            const page = await Page.build<Page>({
                UserId: request.body.UserId,
                id: Uuid(),
                active: false,
                creationDate: request.body.creationDate,
                name: request.body.name,
            })
            
            await repository.create(page, next, response)
            response.json(true)
        } catch (err) {
          response.json(err)
          next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction) {
        const _id = request.params._id
        let pageUpdate = await repository.getOne(_id)
        try {

            if(request.body.name) { pageUpdate.name = request.body.name}
            if(request.body.creationDate) { pageUpdate.creationDate = request.body.creationDate}

            await repository.update(_id, pageUpdate, next).then(data => response.json(data));
            
        } catch (err) {
             response.json(err)
             next(err);
        }
    }

    public async updateActive(request: Request, response: Response, next: NextFunction) {
        const _id = request.params._id
        try {
            let userUpdate = await repository.getOne(_id)

            if (request.body.active) {
                userUpdate.active = false;
              } else {
                userUpdate.active = true;
              }

            await repository.update(_id, userUpdate, next).then(data => response.json(data));
            
        } catch (err) {
             response.json(err)
             next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction) {
        const _id = request.params._id

        const page = await repository.delete(_id, next)
        response.json(page)
    }
}