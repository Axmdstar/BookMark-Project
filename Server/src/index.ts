import express, { NextFunction, Request, Response } from 'express';
import routes from "./Routes/routes";
import cors from 'cors';
import cookieParser from 'cookie-parser';


//? to-do's
// ##info api
// check if connected to Mysql then connect to server
// ###send Cookies
// Add Routes and Controllers
// Routes
// ###Pro Error Handling
//* hash password
// ###login and signup
// ###res.status(200).json({user : user._id})
// ###cookie vaildation
// ###auth middleware
 

const PORT = 2000
const app = express()

//* middleWares
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"https://bookmarks-devaxmed.onrender.com"}));

app.use( (req:Request, res:Response, next:NextFunction)=> {
    console.log(">>>>>>>>>>> # API Info # <<<<<<<<<<<<<<<<\n");
    console.log("header :>>", req.header);
    console.log('req.method :>> ', req.method);
    console.log('req.path :>> ', req.path);
    
    next();
})

app.use(routes);    

app.listen(PORT, () => console.log(`Server Running on ${PORT}`))
// curl -H Origin:https://bookmark-devaxmed.onrender.com --head http://bookmarks-devaxmed.onrender.com