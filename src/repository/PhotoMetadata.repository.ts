import { EntityRepository, Repository } from "typeorm";
import { PhotoMetadata } from "../entity/PhotoMetadata.entity";

@EntityRepository(PhotoMetadata)
export class PhotoMetadataRepository extends Repository<PhotoMetadata> {



}