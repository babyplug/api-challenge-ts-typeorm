import * as express from "express"
import { Request, Response } from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface"

import { Author } from "../entity/Author.entity"
import AuthorService from "../service/Author.service"
import AuthorDTO from "../dto/Author.dto"
import { CustomError } from "../error/CustomError.error"
import AuthSecurity from "../security/Auth.security"

export default class AuthorController implements IControllerBase {
    public path = '/author'
    public router = express.Router()
    private authorService: AuthorService
    private authSecurity: AuthSecurity = new AuthSecurity()
    
    constructor() {
        this.initRoutes()
        this.initAuthorService()
    }

    initAuthorService() {
        this.authorService = new AuthorService()
    }

    initRoutes() {
        this.router
            .route('')
            .get( this.authSecurity.authen, this.getAll)
            .post(this.create)

        this.router
            .route('/:id')
            .get(this.getById)
            .put(this.updateById)
            .delete(this.deleteById)
    }

    getAll = async (req: Request, res: Response) => {
        const author: Author[] = await this.authorService.getAllAuthor(req, res)
        return res.json({
            data: author
        })
    }

    create = async (req: Request, res: Response) => {
        const form: AuthorDTO = req.body
        const author = await this.authorService.createAuthor(form)
        return res.json(author)
    }

    getById = async (req: Request, res: Response) => {
        const authorId: number = Number(req.params.id)
        try {
            const author = await this.authorService.getAuthorById(authorId)
            return res.json(author)
        } catch (e) {
            // if (e instanceof CustomError) {
            //     return res.status(404).json({message: e.message})
            // } return res.status(500).json({message: 'Server error please contact admin !'})
            return res.status(e.statusCode || 500).json({message: e.message})
        }
    }

    updateById = async (req: Request, res: Response) => {
        const authorId: number = Number(req.params.id)
        const form: AuthorDTO = req.body
        try {
            const author = await this.authorService.updateAuthorById(authorId, form)
            return res.json(author)
        } catch (e) {
            // if (e instanceof CustomError) {
            //     return res.status(404).json({message: e.message})
            // } return res.status(500).json({message: 'Server error please contact admin !'})
            return res.status(e.statusCode || 500).json({message: e.message})
        }
    }

    deleteById = async (req: Request, res: Response) => {
        const authorId: number = Number(req.params.id)
        try {
            await this.authorService.deleteAuthorById(authorId)
            return res.json({status: 'success'})
        } catch (e) {
            // if (e instanceof CustomError) {
            //     return res.status(404).json({message: e.message})
            // } return res.status(500).json({message: 'Server error please contact admin !'})
            return res.status(e.statusCode || 500).json({message: e.message})
        }
    }
}
