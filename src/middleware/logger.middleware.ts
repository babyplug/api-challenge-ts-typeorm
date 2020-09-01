import { Request, Response } from 'express'

export default (req: Request, res: Response, next) => {
    console.log('Request logged:', req.method, req.path)
    next()
}
