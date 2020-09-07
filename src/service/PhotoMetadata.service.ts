import { getCustomRepository } from "typeorm"
import { PhotoMetadataRepository } from "../repository/PhotoMetadata.repository";
import { Request, Response } from "express";
import { PhotoMetadata } from "../entity/PhotoMetadata.entity";
import PhotoMetadataDTO from "../dto/PhotoMetadata.dto";
import { CustomError } from "../error/CustomError.error";
import { Photo } from "../entity/Photo.entity";
import PhotoService from "./Photo.service";

export default class PhotoMetadataService {
    public photoMetadataRepository: PhotoMetadataRepository
    public photoService: PhotoService

    constructor() {
        this.photoMetadataRepository = getCustomRepository(PhotoMetadataRepository)
        this.photoService = new PhotoService()
    }

    public async getAllPhotoMetadata(req: Request, res: Response): Promise<PhotoMetadata[]> {
        return await this.photoMetadataRepository.find();
    }

    public async createPhotoMetadata(form: PhotoMetadataDTO): Promise<PhotoMetadata> {
        let dto = await this.photoMetadataRepository.create()
        dto.height = form.height
        dto.width = form.width
        dto.orientation = form.orientation
        dto.compressed = form.compressed
        dto.comment = form.comment

        if (!form.photoId) {
            const photo: Photo = await this.photoService.getById(form.photoId)
            dto.photo = photo
            // dto.photoId = form.photoId
        }

        return await this.photoMetadataRepository.save(dto)
    }

    public async getById(photoId: number): Promise<PhotoMetadata> {
        const photo: PhotoMetadata = await this.photoMetadataRepository.findOne(photoId)
        if (!photo) {
            throw new CustomError({statusCode: 404, message: 'Can not find photo metadata by this id'})
        }
        return photo
    }

    public async updateById(photoId: number, form: PhotoMetadataDTO): Promise<PhotoMetadata> {
        const dto: PhotoMetadata = await this.getById(photoId)
        dto.height = form.height
        dto.width = form.width
        dto.orientation = form.orientation
        dto.compressed = form.compressed
        dto.comment = form.comment
        dto.photoId = form.photoId

        if (!dto.photoId && !form.photoId && dto.photoId !== form.photoId) {
            const photo: Photo = await this.photoService.getById(form.photoId)
            dto.photo = photo
        }

        return await this.photoMetadataRepository.save(dto)
    }

    public async deleteById(photoId: number): Promise<void> {
        const dto: PhotoMetadata = await this.getById(photoId)
        
        await this.photoMetadataRepository.save(dto)
    }
}