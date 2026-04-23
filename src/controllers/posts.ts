import {Request, Response} from "express";

export const getPosts = (req: Request, res: Response) => {
    res.status(200).json([
        {
            id: 1,
            title: "First post",
            content: "Some forum post information"
        },
        {
            id: 2,
            title: "Second post",
            content: "Some forum post information"
        }
    ]);
};

