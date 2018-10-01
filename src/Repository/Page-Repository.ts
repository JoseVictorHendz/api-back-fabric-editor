import { sequelize } from "../sequelize";
import { Transaction } from "sequelize";
import { Page } from "../Models/Page";
import { User } from "../Models/User";

export class PageRepository {

    constructor(){ }

    public async getAll(){
        const page: Page[] = await Page.findAll<Page>({
            include:[User]
          });
        return page
    }

    public async getOne(_id){
        const page: Page = await Page.findOne<Page>({
            include:[User],
            where:{id: _id}
          });
        return page
    }

    public async searchNamePage(_name) {
        const page: any = await Page.findOne({
            limit: 20,
            where: {
                name: { $like: `%${_name}%`},
            }
        })
        return page
    }

    public async create(page, next, response) {
        let newPage
        sequelize.transaction(async (t: Transaction) => {
            try {
                newPage = await page.save({transaction: t})
            } catch(err) {
                t.rollback();
                next(err);
            }
        })
        return newPage
    }

    public async update(_id, page, next) {
        sequelize.transaction(async (t: Transaction) => {
            try {
                const updatedPage = await page.save({transaction: t})
                return updatedPage
            } catch (err) {
                t.rollback();
                next(err);
            }
        })
    }

    public async delete(_id, next) {
        const page = await Page.findOne({
            where: { id: _id },
          }) as Page
      
          page.destroy()
          .then((deletedPage) => {
            return deletedPage;
          })
          .catch((err) => {
            next(err);
          });
    }
}