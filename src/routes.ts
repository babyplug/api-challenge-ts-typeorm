import { Request, Response } from "express";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/posts",
        method: "get",
        action: async (request: Request, response: Response) => {
            response.send('get all posts')
        },
    },
    {
        path: "/posts/:id",
        method: "get",
    },
    {
        path: "/posts",
        method: "post",
    }
];