import 'dotenv/config'
import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const jwt_secret = process.env.jwt_secret

export const userMiddleware= (req: Request, res: Response, next: Function)=>{
    const header = req.headers.token;
    //@ts-ignore
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