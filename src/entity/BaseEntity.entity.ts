import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
    @Column()
    deleted: Boolean

    @CreateDateColumn()
    createDate: Date

    @UpdateDateColumn()
    updateDate: Date
}