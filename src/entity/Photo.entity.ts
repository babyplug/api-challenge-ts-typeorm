import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, ManyToMany, JoinColumn } from "typeorm";
import { PhotoMetadata } from "./PhotoMetadata.entity";
import { Author } from "./Author.entity";
import { Album } from "./Album.entity";
import { BaseEntity } from "./BaseEntity.entity";

@Entity()
export class Photo {
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

    @Column()
    authorId: number;

    @ManyToOne(type => Author, author => author.photos, {
        eager: true,
    })
    @JoinColumn()
    author: Author;

    @ManyToMany(type => Album, album => album.photos)
    albums: Album[];
}