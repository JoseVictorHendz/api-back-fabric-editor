
import { Transaction } from "sequelize";
import { sequelize } from "./sequelize";

import { NextFunction } from "express";
import * as bcrypt from "bcrypt"


import { People } from "./Models/People";
import { User } from "./Models/User";
import { Plan } from "./Models/Plan";
import { Page } from "./Models/Page";
let next: NextFunction
export class PopulateData {
    public async init() {
        await this.createPlan()
        await this.createUser()
        await this.createPage()
    }

    public async createPlan() {
        let newUser
        sequelize.transaction(async (t: Transaction) => {
            const plan = await Plan.build<Plan>({
                id: "1",
                name: "primeiro",
                valueInReais: "39,59",
                valueInDollars: "10,59"
            })
            try {
                await plan.save({transaction: t})
            } catch(err) {
                t.rollback();
                next(err);
            }
        })
    }

    public async createUser() {
        let newUser
        sequelize.transaction(async (t: Transaction) => {

            const people = await People.build<People>({
                address: "rua recife",
                addressNumber: "1430",
                city: "torres",
                country: "Brasil",
                email: "jose.victor.hendz",
                id: "1",
                name: "jose victor",
                phone: "987987987987",
                state: "RS",
            })

            const user = await User.build<User>({
                PeopleId: people.get({plain: true}).id,
                PlanId: "1",
                active: true,
                id: "1",
                password: bcrypt.hashSync("12345", 10),
                people,
                userName: "jose",
            }, {
                include: [People]
            })
            try {
                await user.save({transaction: t})
            } catch(err) {
                t.rollback();
                next(err);
            }
        })
        return newUser
    }

    public async createPage() {
        sequelize.transaction(async (t: Transaction) => {
            try {
                const user: User[] = await User.findAll<User>()
                const page = await Page.build<Page>({
                    UserId: "1",
                    id: "1",
                    active: true,
                    creationDate: "01/10/2018",
                    name: "pagina exemplo",
                })
                await page.save({transaction: t})
            } catch(err) {
                t.rollback();
                next(err);
            }
        })
    }

}