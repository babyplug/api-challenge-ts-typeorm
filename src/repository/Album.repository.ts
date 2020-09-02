import { Repository, EntityRepository } from "typeorm";
import { Album } from "../entity/Album.entity";

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album> {

}