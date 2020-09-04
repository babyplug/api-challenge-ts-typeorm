import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'

export default class AuthController implements IControllerBase {
    public path = '/auth'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router
            .route('')
            .get(this.index)
            // .post(this.login)

        this.router
            .route('/login')
            .post(this.login)
    }

    index = (req: Request, res: Response) => {
        res.send('api challenge typeorm -- auth')
    }

    login = async (req: Request, res: Response) => {
        res.send('api challenge typeorm -- login')
    }
}