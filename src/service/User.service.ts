import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repository/UserRepository"
import { Request, Response } from "express";
import { User } from "../entity/User.entity";
import UserDTO from "../dto/User.dto";
import { CustomError } from "../error/CustomError.error";

export default class UserService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = getCustomRepository(UserRepository)
    }

    public async getAllUsers(req: Request, res: Response): Promise<User[]> {
        return await this.userRepository.find({deleted: false});
    }

    public async createUser(form: UserDTO): Promise<User> {
        let dto = await this.userRepository.create()
        dto.deleted = false
        dto.firstName = form.firstName
        dto.lastName = form.lastName
        dto.age = form.age

        return await this.userRepository.save(dto)
    }

    public async getById(userId: number): Promise<User> {
        const user: User = await this.userRepository.findOne(userId)
        if (!user) {
            throw new CustomError({statusCode: 404, message: 'Can not find user by this id'})
        }
        return user
    }

    public async updateById(userId: number, form: UserDTO): Promise<User> {
        const dto: User = await this.getById(userId)
        dto.firstName = form.firstName
        dto.lastName = form.lastName
        dto.age = form.age

        return await this.userRepository.save(dto)
    }

    public async deleteById(userId: number): Promise<void> {
        const dto: User = await this.getById(userId)
        dto.deleted = true
        await this.userRepository.save(dto)
    }
}