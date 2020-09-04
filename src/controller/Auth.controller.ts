import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'
import UserService from '../service/User.service'
import RegisterDTO from '../dto/Register.dto'
import { CredentialDTO } from '../dto/Credential.dto'
import { TokenResponseDTO } from '../dto/TokenResponse.dto'

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

    index = (_: Request, res: Response) => {
        res.send('api challenge typeorm -- auth')
    }

    login = async (req: Request, res: Response) => {
        const credentials: CredentialDTO = req.body
        const response: TokenResponseDTO = await this.userService.login(credentials)
        if (!response) { 
            return res.status(401).json({
                message: "Username or password not correct !"
            })
        } return res.json(response)
    }

    register = async (req: Request, res: Response) => {
        const form: RegisterDTO = req.body
        await this.userService.register(form)
        res.send('register success')
    }
}