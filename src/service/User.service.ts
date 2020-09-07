import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repository/UserRepository"
import { Request, Response } from "express";
import { User } from "../entity/User.entity";
import UserDTO from "../dto/User.dto";
import { CustomError } from "../error/CustomError.error";
import RegisterDTO from "../dto/Register.dto";
import * as bcrypt from "bcryptjs";
import { CONFIG } from "../security/Config.security";
import { CredentialDTO } from "../dto/Credential.dto";
import * as jwt from "jsonwebtoken";
import { TokenResponseDTO } from "../dto/TokenResponse.dto";

export default class UserService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = getCustomRepository(UserRepository)
    }

    public async getAllUsers(req: Request, res: Response): Promise<User[]> {
        return await this.userRepository.find({ });
    }

    public async createUser(form: UserDTO): Promise<User> {
        let dto = await this.userRepository.create()
        // dto.deleted = false
        dto.firstName = form.firstName
        dto.lastName = form.lastName
        dto.age = form.age

        return await this.userRepository.save(dto)
    }

    public async getById(userId: number): Promise<User> {
        const user: User = await this.userRepository.findOne(userId)
        if (!user) {
            throw new CustomError({ statusCode: 404, message: 'Can not find user by this id' })
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
        // dto.deleted = true
        await this.userRepository.save(dto)
    }

    public async register(form: RegisterDTO): Promise<void> {
        let dto = await this.userRepository.create()
        // dto.deleted = false

        dto.firstName = form.firstName
        dto.lastName = form.lastName
        dto.age = form.age
        dto.username = form.username

        const hashPassword = await bcrypt.hash(form.password, CONFIG.SALT)
        dto.password = hashPassword

        await this.userRepository.save(dto)
    }

    public async login(credentials: CredentialDTO): Promise<TokenResponseDTO> {
        if (!credentials) {
            return null
        }

        const users: User[] = await this.userRepository.findByUsername(credentials.username)
        if (!users || users.length <= 0) {
            return null
        }

        const user = users[0]
        if (!await bcrypt.compare(credentials.password, user.password)) {
            return null
        }

        const token: string = jwt.sign( { id: user.id, username: user.username },
            CONFIG.SECRET,
            { expiresIn: "1d" }
        )
        const response: TokenResponseDTO = { prefix: CONFIG.PREFIX, token: token }
        return response
    }
}