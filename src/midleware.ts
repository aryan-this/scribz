import {jwt_secret} from './config';
import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';


export const userMiddleware= (req: Request, res: Response, next: Function)=>{
    const header = req.headers.token;
    const decodedData = jwt.verify(header as string, jwt_secret)
    if(decodedData){
        //@ts-ignore
        req.userId = decodedData.id
        next();
    }
    else{
        res.status(403).json({
            message: 'You are not logged in'
        })
    }
}