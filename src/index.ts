import "reflect-metadata";
import { createConnection } from "typeorm";

import App from './app'
import * as bodyParser from "body-parser";
import * as express from "express";
import * as cors from "cors";
import HomeController from "./controller/Home.controller";
import UserController from "./controller/User.controller";
import loggerMiddleware from "./middleware/logger.middleware";
import PhotoController from "./controller/Photo.controller";
import PhotoMetadataController from "./controller/PhotoMetadata.controller";
import AuthorController from "./controller/Author.controller";
import AlbumController from "./controller/Album.controller";
import AuthController from "./controller/Auth.controller";
import * as passport from "passport";

createConnection().then(async connection => {

    const app = new App({
        port: 3000,
        controllers: [
            new HomeController(),
            new AuthController(),
            new UserController(),
            new PhotoController(),
            new PhotoMetadataController(),
            new AuthorController(),
            new AlbumController(),
        ],
        middleWares: [
            bodyParser.json(),
            express.json(),
            loggerMiddleware,
            cors(),
            passport.initialize(),
            passport.session(),
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
