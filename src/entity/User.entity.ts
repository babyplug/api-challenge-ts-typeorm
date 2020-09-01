import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity.entity";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
