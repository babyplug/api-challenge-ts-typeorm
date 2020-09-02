import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, ManyToMany } from "typeorm";
import { PhotoMetadata } from "./PhotoMetadata.entity";
import { Author } from "./Author.entity";
import { Album } from "./Album.entity";
import { BaseEntity } from "./BaseEntity.entity";

@Entity()
export class Photo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column("text")
    description: string;

    @Column()
    filename: string;

    @Column("double")
    views: number;

    @Column()
    isPublished: boolean;

    @OneToOne(type => PhotoMetadata, photoMetadata => photoMetadata.photo, {
        cascade: true,
    })
    metadata: PhotoMetadata;

    @ManyToOne(type => Author, author => author.photos)
    author: Author;

    @ManyToMany(type => Album, album => album.photos)
    albums: Album[];
}