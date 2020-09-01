import * as express from "express"
import { Request, Response } from 'express'
import IControllerBase from "../interfaces/IControllerBase.interface"

import { User } from "../entity/User.entity"
import UserService from "../service/User.service"
import UserDTO from "../dto/User.dto"
import { NotFoundException } from "../error/NotFoundException.error"

export default class UserController implements IControllerBase {
    public path = '/user'
    public router = express.Router()
    private userService: UserService
    
    constructor() {
        this.initRoutes()
        this.initUserService()
    }

    initUserService() {
        this.userService = new UserService()
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
        const users: User[] = await this.userService.getAllUsers(req, res)
        return res.json({
            data: users
        })
    }

    create = async (req: Request, res: Response) => {
        const form: UserDTO = req.body
        const user = await this.userService.createUser(form)
        return res.json(user)
    }

    getById = async (req: Request, res: Response) => {
        const userId: number = Number(req.params.id)
        try {
            const user = await this.userService.getById(userId)
            return res.json(user)
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
    }

    updateById = async (req: Request, res: Response) => {
        const userId: number = Number(req.params.id)
        const form: UserDTO = req.body
        try {
            const user = await this.userService.updateById(userId, form)
            return res.json(user)
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
    }

    deleteById = async (req: Request, res: Response) => {
        const userId: number = Number(req.params.id)
        try {
            await this.userService.deleteById(userId)
            return res.json({status: 'success'})
        } catch (e) {
            if (e instanceof NotFoundException) {
                return res.status(404).json({message: e.message})
            } return res.status(500).json({message: 'Server error please contact admin !'})
        }
    }
}
