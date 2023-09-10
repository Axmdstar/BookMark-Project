import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CheckId } from "../dbfunc/functions";

interface cookiedata {
    idUser?: string,
    name?: string,
    auth: boolean
}

declare global {
    namespace Express {
      interface Request {
        userauth: cookiedata;
      }
    }
  }

interface userpayload {
    idUser: string,
    name: string
}
interface decodedtoken {
    payload: userpayload,
    iat: number,
    exp: number
}

export  const authUser = async (req:Request , res:Response,  next:NextFunction) => {
    // get cookie 
    const cookie = req.cookies.bookmark
    const secret = "devaxmed"
    console.log("authUser >>>:",cookie);
    // cookie found in browser 
    if (cookie) {
        console.log("in the if >>>>>");
        try {
            const data = jwt.verify(cookie,secret)
            const decoded = data as decodedtoken
            console.log("decoded Request  >>>>:", decoded.payload);
            const {idUser, name} = decoded.payload
            const result = await CheckId(idUser)

            // setUserdata({id:idUser, name:name, auth:true})
            
            if(result){    
                req.userauth = {idUser, name, auth:true }
            }

        } catch (error) {
            console.log(error);
            req.userauth = {auth:false}
        } 
        
        
    }
    else{
        console.log("No Cookie Found $$$$$$$");
        req.userauth = {auth:false}
    } 

    next()
}
