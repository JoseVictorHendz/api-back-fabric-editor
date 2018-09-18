import { sequelize } from "../sequelize";
import { Transaction } from "sequelize";

import { User } from "../Models/User";
import { People } from "../Models/People";


export class UserRepository {

    constructor(){ }

    public async getAll(){
        const user: User[] = await User.findAll<User>({
            include:[People]
          });
        return user
    }

    public async getOne(_id){
        const user: User = await User.findOne<User>({
            include:[People],
            where:{id: _id}
          });
        return user
    }

    public async searchNameUser(_name) {
        const user: any = await User.findOne({
            limit: 20,
            where: {
                userName: { $like: `%${_name}%`},
            }
        })
        return user
    }

    public async create(user, next) {
        sequelize.transaction(async (t: Transaction) => {
            try {

                const newUser =  await user.save({transaction: t})
                return newUser
            } catch(err) {
                t.rollback();
                next(err);
            }
        })
    }

    public async update(_id, user, next) {
        sequelize.transaction(async (t: Transaction) => {
            try {
                await user.people.save({transaction: t})
                const updatedUser = await user.save({transaction: t})

                return updatedUser
            } catch (err) {
                t.rollback();
                next(err);
            }
        })
    }

    public async delete(_id, next) {
        const user = await User.findOne({
            include:[People],
            where: { id: _id },
          }) as User
      
          user.people.destroy()
          .then((deletedUser) => {
            return deletedUser;
          })
          .catch((err) => {
            next(err);
          });
    }
}