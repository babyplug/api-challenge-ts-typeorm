import { Request, Response } from "express";
import { getCustomRepository } from "typeorm"
import { NotFoundException } from "../error/NotFoundException.error";
import { AuthorRepository } from "../repository/Author.repository";
import { Author } from "../entity/Author.entity";
import AuthorDTO from "../dto/Author.dto";

export default class AuthorService {
    public authorRepository: AuthorRepository

    constructor() {
        this.authorRepository = getCustomRepository(AuthorRepository)
    }

    public async getAllAuthor(req: Request, res: Response): Promise<Author[]> {
        return await this.authorRepository.find();
    }

    public async createAuthor(form: AuthorDTO): Promise<Author> {
        let dto = await this.authorRepository.create()

        dto.name = form.name

        return await this.authorRepository.save(dto)
    }

    public async getAuthorById(authorId: number): Promise<Author> {
        const author: Author = await this.authorRepository.findOne(authorId)
        if (!author) {
            throw new NotFoundException('Can not find author by this id')
        }
        return author
    }

    public async updateAuthorById(authorId: number, form: AuthorDTO): Promise<Author> {
        const dto: Author = await this.getAuthorById(authorId)
        dto.name = form.name

        return await this.authorRepository.save(dto)
    }

    public async deleteAuthorById(authorId: number): Promise<void> {
        const dto: Author = await this.getAuthorById(authorId)

        await this.authorRepository.save(dto)
    }
}