"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => {
    const header = req.headers.token;
    const decodedData = jsonwebtoken_1.default.verify(header, config_1.jwt_secret);
    if (decodedData) {
        //@ts-ignore
        req.userId = decodedData.id;
        next();
    }
    else {
        res.status(403).json({
            message: 'You are not logged in'
        });
    }
};
exports.userMiddleware = userMiddleware;
