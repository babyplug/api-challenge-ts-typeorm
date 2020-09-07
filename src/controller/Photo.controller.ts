import * as express from "express"
import { Request, Response } from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface"

import { Photo } from "../entity/Photo.entity"
import PhotoService from "../service/Photo.service"
import PhotoDTO from "../dto/Photo.dto"
import { CustomError } from "../error/CustomError.error"

export default class PhotoController implements IControllerBase {
    public path = '/photo'
    public router = express.Router()
    private photoService: PhotoService
    
    constructor() {
        this.initRoutes()
        this.initPhotoService()
    }

    initPhotoService() {
        this.photoService = new PhotoService()
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
        const photo: Photo[] = await this.photoService.getAllPhoto(req, res)
        return res.json({
            data: photo
        })
    }

    create = async (req: Request, res: Response) => {
        const form: PhotoDTO = req.body
        try {
            const photo = await this.photoService.createPhoto(form)
            return res.json(photo)
        } catch (e) {
            // if (e instanceof CustomError) {
            //     return res.status(404).json({message: e.message})
            // } return res.status(500).json({message: 'Server error please contact admin !'})
            return res.status(e.statusCode || 500).json({message: e.message})
        }
    }

    getById = async (req: Request, res: Response) => {
        const photoId: number = Number(req.params.id)
        try {
            const photo = await this.photoService.getById(photoId)
            return res.json(photo)
        } catch (e) {
            // if (e instanceof CustomError) {
            //     return res.status(404).json({message: e.message})
            // } return res.status(500).json({message: 'Server error please contact admin !'})
            return res.status(e.statusCode || 500).json({message: e.message})
        }
    }

    updateById = async (req: Request, res: Response) => {
        const photoId: number = Number(req.params.id)
        const form: PhotoDTO = req.body
        try {
            const photo = await this.photoService.updateById(photoId, form)
            return res.json(photo)
        } catch (e) {
            // if (e instanceof CustomError) {
            //     return res.status(404).json({message: e.message})
            // } return res.status(500).json({message: 'Server error please contact admin !'})
            return res.status(e.statusCode || 500).json({message: e.message})
        }
    }

    deleteById = async (req: Request, res: Response) => {
        const photoId: number = Number(req.params.id)
        try {
            await this.photoService.deleteById(photoId)
            return res.json({status: 'success'})
        } catch (e) {
            // if (e instanceof CustomError) {
            //     return res.status(404).json({message: e.message})
            // } return res.status(500).json({message: 'Server error please contact admin !'})
            return res.status(e.statusCode || 500).json({message: e.message})
        }
    }
}
