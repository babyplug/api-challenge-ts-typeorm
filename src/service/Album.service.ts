import { Request, Response } from "express";
import { getCustomRepository } from "typeorm"
import { CustomError } from "../error/CustomError.error";
import { AlbumRepository } from "../repository/Album.repository";
import { Album } from "../entity/Album.entity";
import AlbumDTO from "../dto/Album.dto";

export default class AlbumService {
    public albumRepository: AlbumRepository

    constructor() {
        this.albumRepository = getCustomRepository(AlbumRepository)
    }

    public async getAllAuthor(req: Request, res: Response): Promise<Album[]> {
        return await this.albumRepository.find();
    }

    public async createAuthor(form: AlbumDTO): Promise<Album> {
        let dto = await this.albumRepository.create()

        dto.name = form.name

        return await this.albumRepository.save(dto)
    }

    public async getAuthorById(authorId: number): Promise<Album> {
        const album: Album = await this.albumRepository.findOne(authorId)
        if (!album) {
            throw new CustomError({statusCode: 404, message: 'Can not find album by this id'})
        }
        return album
    }

    public async updateAuthorById(authorId: number, form: AlbumDTO): Promise<Album> {
        const dto: Album = await this.getAuthorById(authorId)
        dto.name = form.name

        return await this.albumRepository.save(dto)
    }

    public async deleteAuthorById(authorId: number): Promise<void> {
        const dto: Album = await this.getAuthorById(authorId)

        await this.albumRepository.save(dto)
    }
}