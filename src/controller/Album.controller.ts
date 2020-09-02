import * as express from "express"
import { Request, Response } from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface"

import { Album } from "../entity/Album.entity"
import AlbumService from "../service/Album.service"
import AlbumDTO from "../dto/Album.dto"
import { CustomError } from "../error/CustomError.error"

export default class AlbumController implements IControllerBase {
    public path = '/album'
    public router = express.Router()
    private albumService: AlbumService
    
    constructor() {
        this.initRoutes()
        this.initAlbumService()
    }

    initAlbumService() {
        this.albumService = new AlbumService()
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
        const album: Album[] = await this.albumService.getAllAuthor(req, res)
        return res.json({
            data: album
        })
    }

    create = async (req: Request, res: Response) => {
        const form: AlbumDTO = req.body
        const album = await this.albumService.createAuthor(form)
        return res.json(album)
    }

    getById = async (req: Request, res: Response) => {
        const authorId: number = Number(req.params.id)
        try {
            const album = await this.albumService.getAuthorById(authorId)
            return res.json(album)
        } catch (e) {
            return res.status(e.statusCode || 500).json({message: e.message})
            // if (e instanceof CustomError) {
            //     return res.status(404).json({message: e.message})
            // } return res.status(500).json({message: 'Server error please contact admin !'})
        }
    }

    updateById = async (req: Request, res: Response) => {
        const authorId: number = Number(req.params.id)
        const form: AlbumDTO = req.body
        try {
            const album = await this.albumService.updateAuthorById(authorId, form)
            return res.json(album)
        } catch (e) {
            return res.status(e.statusCode || 500).json({message: e.message})
            // if (e instanceof CustomError) {
            //     return res.status(404).json({message: e.message})
            // } return res.status(500).json({message: 'Server error please contact admin !'})
        }
    }

    deleteById = async (req: Request, res: Response) => {
        const authorId: number = Number(req.params.id)
        try {
            await this.albumService.deleteAuthorById(authorId)
            return res.json({status: 'success'})
        } catch (e) {
            return res.status(e.statusCode || 500).json({message: e.message})
            // if (e instanceof CustomError) {
            //     return res.status(404).json({message: e.message})
            // } return res.status(500).json({message: 'Server error please contact admin !'})
        }
    }
}
