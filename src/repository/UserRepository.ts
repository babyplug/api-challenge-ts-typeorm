import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    findByName(firstName: string, lastName: string): Promise<User> {
        return this.findOne({ firstName, lastName });
    }

}