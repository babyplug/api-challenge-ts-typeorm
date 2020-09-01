import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'

class HomeController implements IControllerBase {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router
            .route(this.path)
            .get(this.index)
    }

    index = (_: any, res: Response) => {
        res.send('api challenge typeorm -- index')
    }
}

export default HomeController