import { NextFunction, Request, Response } from 'express';
import * as dbfunc from '../dbfunc/functions';
import * as jwt from 'jsonwebtoken';
import { nanoid } from "nanoid";



const CreateToken = (payload: object) => {
    const secret = "devaxmed"
    const expires = 60 * 609
    const token = jwt.sign({payload}, secret, {expiresIn:expires})
    console.log("Token >>>> ", token);
    console.log("Payload >>>> ", payload);
    return token 
}






//! User Function 
export const LogOut =  (req:Request, res:Response) => {
    console.log(req.cookies.bookmark);
    res.cookie("bookmark",req.cookies,{maxAge:0, httpOnly:true})
    res.send("why")
}

export const LogIn = async (req:Request, res:Response, next:NextFunction) => {
    console.log("Got the data from formsData ", req.body);
    // const {UserName, Password} = req.body
    let check:any;

    try {
        check = await  dbfunc.Checkuser(req.body)
        console.log("In the Try Check >>",check);
    } catch (error) {
        console.log("Failed to Connect to the database");
        next(error);
    }
    
    if ( 'message' in check ) {
        console.log(check.message);
        res.status(check.status).send(check.message)    
    } else {
        const {idUser,name} = check

        const cookies = CreateToken({idUser, name})
        res.cookie("bookmark", cookies,{httpOnly:true})
        res.send({idUser, name})
    }  
}

export const SignUp = async (req:Request, res:Response) => {
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
    
}

export const Guest = async (req:Request, res:Response) => {
    // values("${id}","${data.username}","${data.password}","${data.email}");

    // Genarate Name 
    let num: number = Math.floor(Math.random() * 800);
    const name: string = "guest" + num;
    // id 
    const id:string = nanoid();
    // password and email is not unique in the db
    const psd:string = "qwerty";
    // email 
    const email:string =name + "@guest.com"

    const data:any = {username:name, password:psd, email}
    console.log('data :>> ', data);
    const dbres:boolean = await dbfunc.NewUser(data, id);

    if (dbres) {
        res.send({name, id})
    } else {
        res.send("Try Again").status(500)
    }

}

export const BrowserInfo = (req:Request, res:Response)=> {
    // res.setHeader('Access-Control-Allow-Origin', 'https://bookmarks-devaxmed.onrender.com');
    console.log(req.userauth);
    res.send(req.userauth);
}
//! ________________________________________________________________



//! BookMark function 
export const  GetExploreBks = async (req:Request, res:Response) => {
    const Bks = await dbfunc.GetExploreBks();
    console.log(Bks);
    res.send(Bks);
}

export const GetBks =  async (req:Request, res:Response) => {
    const usrid: string = req.params.id;
    
    const result = await dbfunc.GetUsrBk(usrid);
    res.status(200).send(result);
}

export const GetItems = async (req:Request, res:Response) => {  
    const Bkid: string = req.params.id
    const result = await dbfunc.GetBkItems(Bkid);
    res.status(200).send(result);
}



//! CURD
export const AddBk =  async (req:Request, res:Response) => {
    console.log("New Bookmark", req.body);
    
    dbfunc.NewBk(req.body);
    res.status(200).send('POST request to the homepage');
}

export const AddItem2Bk = async (req:Request, res:Response) => {
    console.log('req.body :>> ', req.body);
    dbfunc.NewBkitem(req.body);
}

export const Like = async (req:Request, res:Response) => {
    dbfunc.liked(req.body);
    res.send('POST request to the homepage')
}

export const Delete = async (req:Request, res:Response) => {
    const item:string = req.params.item;
    const type:string = req.params.type;
    console.log(item , " ", type);
    dbfunc.DeleteFromDB(type, item);

    res.send("Item deleted");
}

//! _________________________________________________________________