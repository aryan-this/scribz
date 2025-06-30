import express from 'express';
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { ContentModel, UserModel } from './db';
import { userMiddleware } from './midleware';
import cors from 'cors';


const jwt_secret = process.env.jwt_secret as string
const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/v1/signup', async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    try{
        // ZOD, Hashing
        await UserModel.create({
            username: username,
            password: password
        }) 
        res.json({
            message: 'Signed up!'
        })
    }
    catch(e){
        res.status(411).json({
            message: 'User already exists!'
        })
    }
})

app.post('/api/v1/signin', async(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const userFound = await UserModel.findOne({
        username,
        password
    })

    if (userFound){
        const token = jwt.sign({
            id: userFound._id
        }, jwt_secret)

        res.json({
            token: token
        })
        console.log(token)
    }
    else{
        res.status(403).json({
            message: 'Incorrect credentials'
        })
    }
})
// @ts-ignore
app.post('/api/v1/content',userMiddleware, async(req, res)=>{
    const title = req.body.title;
    const type = req.body.type;
    const link = req.body.link;
    await ContentModel.create({
        title,
        type,
        link,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })
    return res.json({
        message: 'Content added'
    })
})
// @ts-ignore
app.get('/api/v1/content', userMiddleware, async(req, res)=>{
    //@ts-ignore
    const userId= req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate('userId','username')
    res.json({
        content
    })

})

app.delete('/api/v1/content',userMiddleware, async(req, res)=>{
    const contentId= req.body.contentId;
    await ContentModel.deleteOne({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message: 'Content Deleted'
    })
})

app.listen(3000);