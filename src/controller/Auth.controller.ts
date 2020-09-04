import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'
import UserService from '../service/User.service'
import RegisterDTO from '../dto/Register.dto'

export default class AuthController implements IControllerBase {
    public path = '/auth'
    public router = express.Router()
    userService: UserService

    constructor() {
        this.initRoutes()
        this.userService = new UserService()
    }

    public initRoutes() {
        this.router
            .route('')
            .get(this.index)
            // .post(this.login)

        this.router
            .route('/login')
            .post(this.login)

        this.router
            .route('/register')
            .post(this.register)
    }

    index = (req: Request, res: Response) => {
        res.send('api challenge typeorm -- auth')
    }

    login = async (req: Request, res: Response) => {
        res.send('api challenge typeorm -- login')
    }

    register = async (req: Request, res: Response) => {
        const form: RegisterDTO = req.body
        await this.userService.register(form)
        res.send('register success')
    }
}