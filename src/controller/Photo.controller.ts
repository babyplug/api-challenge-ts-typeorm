import * as express from "express"
import { Request, Response } from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface"

import { Photo } from "../entity/Photo.entity"
import PhotoService from "../service/Photo.service"
import PhotoDTO from "../dto/Photo.dto"
import { NotFoundException } from "../error/NotFoundException.error"

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
        const users: Photo[] = await this.photoService.getAllPhoto(req, res)
        return res.json({
            data: users
        })
    }

    create = async (req: Request, res: Response) => {
        const form: PhotoDTO = req.body
        const user = await this.photoService.createPhoto(form)
        return res.json(user)
    }

    getById = async (req: Request, res: Response) => {
        const userId: number = Number(req.params.id)
        try {
            const user = await this.photoService.getById(userId)
            return res.json(user)
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
    }

    updateById = async (req: Request, res: Response) => {
        const userId: number = Number(req.params.id)
        const form: PhotoDTO = req.body
        try {
            const user = await this.photoService.updateById(userId, form)
            return res.json(user)
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
    }

    deleteById = async (req: Request, res: Response) => {
        const userId: number = Number(req.params.id)
        try {
            await this.photoService.deleteById(userId)
            return res.json({status: 'success'})
        } catch (e) {
            if (e instanceof NotFoundException) {
                return res.status(404).json({message: e.message})
            } return res.status(500).json({message: 'Server error please contact admin !'})
        }
    }
}
