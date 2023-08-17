import express, { NextFunction } from 'express';
import { Request, Response } from "express";
import * as dbfunc from './dbfunc/functions';
import {authUser} from './middleware/auth_mdw';
import * as jwt from 'jsonwebtoken';
import { nanoid } from "nanoid";
//* cookieParser is needed so that express can read cookies
 import cookieParser from 'cookie-parser';
// import { bmtype, usrtype, Errortype } from "../src/Types/types";



const CreateToken = (payload: object) => {
    const secret = "devaxmed"
    const expires = 60 * 60
    const token = jwt.sign({payload}, secret, {expiresIn:expires})
    console.log("Token >>>> ", token);
    console.log("Payload >>>> ", payload);
    return token 
}
//? to-do's
//* ##info api
//* check if connected to Mysql then connect to server
//* ###send Cookies
//* Add Routes and Controllers
//* static Folder for images
//* Routes
//* ###Pro Error Handling
//* hash password
//* ###login and signup
//* ###res.status(200).json({user : user._id})
//* ###cookie vaildation
//* ###auth middleware
 

const PORT = 2000
const app = express()

//* middleWares
app.use(express.json())
app.use(cookieParser())

//* Info MiddleWare
app.use( (req:Request, res:Response, next:NextFunction)=> {
    console.log(">>>>>>>>>>> API Info <<<<<<<<<<<<<<<<\n");
    console.log('req.method :>> ', req.method);
    console.log('req.path :>> ', req.path);
    next();
})

app.get("/api", authUser, (req:Request , res:Response ) => {
    res.send({"test": "hello"});
})


app.get("/browserinfo", authUser, (req:Request, res:Response)=> {
    res.send(req.userauth);
})



app.get('/getbks/:id', async (req:Request, res:Response) => {
  const usrid: string = req.params.id;
  
  const result = await dbfunc.GetUsrBk(usrid);
  res.status(200).send(result);
})



app.get("/getItems/:id", async (req:Request, res:Response) => {  
    const Bkid: string = req.params.id
    const result = await dbfunc.GetBkItems(Bkid);
    res.status(200).send(result);
})

// user related Api's 
app.post("/login", async (req:Request, res:Response) => {
    
    console.log("Got the data from formsData ", req);
    // const {UserName, Password} = req.body
    const check = await  dbfunc.Checkuser(req.body)

    // console.log('message' in check  );
    if ( 'message' in check ) {
        console.log(check.message);
        res.status(check.status).send(check.message)    
    } else {
        const {idUser,name} = check
        console.log(idUser)

        const cookies = CreateToken({idUser, name})
        res.cookie("bookmark", cookies,{httpOnly:true})
        res.send({idUser, name})
    }  
})


app.post("/signup",async (req:Request, res:Response) => {
    console.log("data from the signup form", req.body);
    const id:string = nanoid();
    const dbres:boolean = await dbfunc.NewUser(req.body, id);
    
    if (dbres) {
        const {username} = req.body;
        const cookies = CreateToken({id, username});
        res.cookie("bookmark", cookies,{httpOnly:true}).send("Succesful");

    }else {
        res.status(500).send({error:"Duplicate Values"});
    }    
    
})

app.post('/addBk', async (req:Request, res:Response) => {
    console.log("New Bookmark", req.body);
    
    dbfunc.NewBk(req.body);
    res.status(200).send('POST request to the homepage');
})

app.post("/additem",async (req:Request, res:Response) => {
    console.log('req.body :>> ', req.body);
    dbfunc.NewBkitem(req.body);
})  

app.listen(PORT, () => console.log(`Server Running on ${PORT}`))
