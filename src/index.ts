import "reflect-metadata";
import { createConnection } from "typeorm";
// import { User } from "./entity/User";
// import { Photo } from "./entity/Photo";
// import { PhotoMetadata } from "./entity/PhotoMetadata";
// import { Album } from "./entity/Album";
// import { Request, Response } from "express";
// import * as express from "express";
// import * as bodyParser from "body-parser";
// import { AppRoutes } from "./routes";
// import userRouter from "./controller/User.controller";

import App from './app'
import * as bodyParser from "body-parser"
import * as express from "express"
import HomeController from "./controller/Home.controller";
import UserController from "./controller/User.controller";
import loggerMiddleware from "./middleware/logger.middleware";

createConnection().then(async connection => {

    const app = new App({
        port: 3000,
        controllers: [
            new HomeController(),
            new UserController(),
        ],
        middleWares: [
            bodyParser.json(),
            express.json(),
            loggerMiddleware,
        ],
    })

    app.listen()

    // const app: express.Application = express();
    // app.use(bodyParser.json());
    // app.use(express.json());
    
    // app.get('/', (req: Request, res: Response) => {
    //     res.send("welcome for typeorm and express-ts")
    // })
    
    // app.use("/user", userRouter);

    // // register all application routes
    // // AppRoutes.forEach(route => {
    //     // app[route.method](route.path, (request: Request, response: Response, next: Function) => {
    //         // route.action(request, response)
    //             // .then(() => next)
    //             // .catch(err => next(err));
    //     // });
    // // });

    // // run app
    // app.listen(port);
    // console.log('app is running on port: ', port);

}).catch(error => console.log(error));
