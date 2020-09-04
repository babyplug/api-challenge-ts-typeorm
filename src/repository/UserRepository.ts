import { EntityRepository, Repository, getRepository } from "typeorm";
import { User } from "../entity/User.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    findByName(firstName: string, lastName: string): Promise<User> {
        return this.findOne({ firstName, lastName });
    }

    findByUsername(username: string): Promise<User[]> {
        return this.createQueryBuilder("user")
                .addSelect("user.password")
                .where("username = :username", { username })
                .orderBy("createDate", "DESC")
                .getMany()
        // return this.createQueryBuilder()
        //     .addSelect('user.password')
        //     .where("username = :username", { username })
        //     .orderBy("createDate", "DESC")
        //     .getMany()
    }

}