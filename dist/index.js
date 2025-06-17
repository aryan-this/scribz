"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const midleware_1 = require("./midleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        // ZOD, Hashing
        yield db_1.UserModel.create({
            username: username,
            password: password
        });
        res.json({
            message: 'Signed up!'
        });
    }
    catch (e) {
        res.status(411).json({
            message: 'User already exists!'
        });
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const userFound = yield db_1.UserModel.findOne({
        username,
        password
    });
    if (userFound) {
        const token = jsonwebtoken_1.default.sign({
            id: userFound._id
        }, config_1.jwt_secret);
        res.json({
            token: token
        });
        console.log(token);
    }
    else {
        res.status(403).json({
            message: 'Incorrect credentials'
        });
    }
}));
// @ts-ignore
app.post('/api/v1/content', midleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const type = req.body.type;
    const link = req.body.link;
    yield db_1.ContentModel.create({
        title,
        type,
        link,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    return res.json({
        message: 'Content added'
    });
}));
// @ts-ignore
app.get('/api/v1/content', midleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate('userId');
    res.json({
        content
    });
}));
app.post('api/v1/post', (req, res) => {
});
app.listen(3000);
