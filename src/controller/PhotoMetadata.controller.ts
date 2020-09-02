import * as express from "express"
import { Request, Response } from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface"

import { PhotoMetadata } from "../entity/PhotoMetadata.entity"
import PhotoMetadataService from "../service/PhotoMetadata.service"
import PhotoMetadataDTO from "../dto/PhotoMetadata.dto"
import { NotFoundException } from "../error/NotFoundException.error"

export default class PhotoMetadataController implements IControllerBase {
    public path = '/photo-metadata'
    public router = express.Router()
    private photoMetadataService: PhotoMetadataService
    
    constructor() {
        this.initRoutes()
        this.initPhotoMetadataService()
    }

    initPhotoMetadataService() {
        this.photoMetadataService = new PhotoMetadataService()
    }

    initRoutes() {
        this.router
            .route('')
            .get(this.getAll)
            .post(this.create)

        this.router
            .route('/:id')
            .get(this.getById)
            .put(this.updateById)
            .delete(this.deleteById)
    }

    getAll = async (req: Request, res: Response) => {
        const photoMetadata: PhotoMetadata[] = await this.photoMetadataService.getAllPhotoMetadata(req, res)
        return res.json({
            data: photoMetadata
        })
    }

    create = async (req: Request, res: Response) => {
        const form: PhotoMetadataDTO = req.body
        const photoMetadata = await this.photoMetadataService.createPhotoMetadata(form)
        return res.json(photoMetadata)
    }

    getById = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id)
        try {
            const photoMetadata = await this.photoMetadataService.getById(id)
            return res.json(photoMetadata)
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
    }

    updateById = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id)
        const form: PhotoMetadataDTO = req.body
        try {
            const photoMetadata = await this.photoMetadataService.updateById(id, form)
            return res.json(photoMetadata)
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
    }

    deleteById = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id)
        try {
            await this.photoMetadataService.deleteById(id)
            return res.json({status: 'success'})
        } catch (e) {
            if (e instanceof NotFoundException) {
                return res.status(404).json({message: e.message})
            } return res.status(500).json({message: 'Server error please contact admin !'})
        }
    }
}
