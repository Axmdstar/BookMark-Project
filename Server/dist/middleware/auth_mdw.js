"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const functions_1 = require("../dbfunc/functions");
const authUser = async (req, res, next) => {
    // get cookie 
    const cookie = req.cookies.bookmark;
    const secret = "devaxmed";
    // cookie found in browser 
    if (cookie) {
        try {
            const data = jsonwebtoken_1.default.verify(cookie, secret);
            const decoded = data;
            console.log("decoded Request  >>>>:", decoded.payload);
            const { idUser, name } = decoded.payload;
            const result = await (0, functions_1.CheckId)(idUser);
            // setUserdata({id:idUser, name:name, auth:true})
            if (result) {
                req.userauth = { idUser, name, auth: true };
            }
        }
        catch (error) {
            req.userauth = { auth: false };
        }
    }
    else {
        req.userauth = { auth: false };
    }
    next();
};
exports.authUser = authUser;
