import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { Album } from "./entity/Album";
import { Request, Response } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";

createConnection().then(async connection => {

    const app: express.Application = express();
    app.use(bodyParser.json());
    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.send("welcome for typeorm and express-ts")
    })

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
    app.listen(3000);

    console.log("Express application is up and running on port 3000");

}).catch(error => console.log(error));
