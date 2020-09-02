import { Repository, EntityRepository } from "typeorm";
import { Author } from "../entity/Author.entity";

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {

}