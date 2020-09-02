import { getCustomRepository } from "typeorm"
import { PhotoRepository } from "../repository/PhotoRepository"
import { Request, Response } from "express";
import { Photo } from "../entity/Photo.entity";
import PhotoDTO from "../dto/Photo.dto";
import { NotFoundException } from "../error/NotFoundException.error";

export default class PhotoService {
    public photoRepository: PhotoRepository

    constructor() {
        this.photoRepository = getCustomRepository(PhotoRepository)
    }

    public async getAllPhoto(req: Request, res: Response): Promise<Photo[]> {
        return await this.photoRepository.find({deleted: false});
    }

    public async createPhoto(form: PhotoDTO): Promise<Photo> {
        let dto = await this.photoRepository.create()
        dto.deleted = false

        dto.name = form.name
        dto.description = form.description
        dto.filename = form.filename
        dto.views = form.views
        dto.isPublished = form.isPublished

        return await this.photoRepository.save(dto)
    }

    public async getById(photoId: number): Promise<Photo> {
        const photo: Photo = await this.photoRepository.findOne(photoId)
        if (!photo) {
            throw new NotFoundException('Can not find photo by this id')
        }
        return photo
    }

    public async updateById(photoId: number, form: PhotoDTO): Promise<Photo> {
        const dto: Photo = await this.getById(photoId)
        dto.name = form.name
        dto.description = form.description
        dto.filename = form.filename
        dto.views = form.views
        dto.isPublished = form.isPublished

        return await this.photoRepository.save(dto)
    }

    public async deleteById(photoId: number): Promise<void> {
        const dto: Photo = await this.getById(photoId)
        dto.deleted = true
        await this.photoRepository.save(dto)
    }
}