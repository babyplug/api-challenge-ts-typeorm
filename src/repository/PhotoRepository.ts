import { EntityRepository, Repository } from "typeorm";
import { Photo } from "../entity/Photo.entity";

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {



}