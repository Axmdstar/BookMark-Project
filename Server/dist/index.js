"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbfunc = __importStar(require("./dbfunc/functions"));
const auth_mdw_1 = require("./middleware/auth_mdw");
const jwt = __importStar(require("jsonwebtoken"));
const nanoid_1 = require("nanoid");
//* cookieParser is needed so that express can read cookies
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import { bmtype, usrtype, Errortype } from "../src/Types/types";
const CreateToken = (payload) => {
    const secret = "devaxmed";
    const expires = 60 * 60;
    const token = jwt.sign({ payload }, secret, { expiresIn: expires });
    console.log("Token >>>> ", token);
    console.log("Payload >>>> ", payload);
    return token;
};
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
const PORT = 2000;
const app = (0, express_1.default)();
//* middleWares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//* Info MiddleWare
app.use((req, res, next) => {
    console.log(">>>>>>>>>>> API Info <<<<<<<<<<<<<<<<\n");
    console.log("all Good");
    console.log('req.method :>> ', req.method);
    console.log('req.path :>> ', req.path);
    next();
});
//! User Related 
app.get("/LogOut", (req, res) => {
    console.log(req.cookies.bookmark);
    res.cookie("bookmark", req.cookies, { maxAge: 0, httpOnly: true });
    res.send("why");
});
app.post("/login", async (req, res) => {
    console.log("Got the data from formsData ");
    // const {UserName, Password} = req.body
    let check;
    try {
        check = await dbfunc.Checkuser(req.body);
    }
    catch (error) {
        console.log("Failed to Connect to the database");
    }
    // const check = await  dbfunc.Checkuser(req.body)
    // console.log('message' in check  );
    if ('message' in check) {
        console.log(check.message);
        res.status(check.status).send(check.message);
    }
    else {
        const { idUser, name } = check;
        console.log(idUser);
        const cookies = CreateToken({ idUser, name });
        res.cookie("bookmark", cookies, { httpOnly: true });
        res.send({ idUser, name });
    }
});
app.post("/signup", async (req, res) => {
    console.log("data from the signup form", req.body);
    const id = (0, nanoid_1.nanoid)();
    const dbres = await dbfunc.NewUser(req.body, id);
    if (dbres) {
        const { username } = req.body;
        const cookies = CreateToken({ id, username });
        res.cookie("bookmark", cookies, { httpOnly: true }).send("Succesful");
    }
    else {
        res.status(500).send({ error: "Duplicate Values" });
    }
});
app.get("/browserinfo", auth_mdw_1.authUser, (req, res) => {
    res.send(req.userauth);
});
//! Bookmark related
app.get("/getExplore", auth_mdw_1.authUser, async (req, res) => {
    const Bks = await dbfunc.GetExploreBks();
    console.log(Bks);
    res.send(Bks);
});
app.get('/getbks/:id', async (req, res) => {
    const usrid = req.params.id;
    const result = await dbfunc.GetUsrBk(usrid);
    res.status(200).send(result);
});
app.get("/getItems/:id", async (req, res) => {
    const Bkid = req.params.id;
    const result = await dbfunc.GetBkItems(Bkid);
    res.status(200).send(result);
});
//! Updating bkmks related Api's (CURD) 
app.post('/addBk', async (req, res) => {
    console.log("New Bookmark", req.body);
    dbfunc.NewBk(req.body);
    res.status(200).send('POST request to the homepage');
});
app.post("/additem", async (req, res) => {
    console.log('req.body :>> ', req.body);
    dbfunc.NewBkitem(req.body);
});
app.post('/like', async (req, res) => {
    dbfunc.liked(req.body);
    res.send('POST request to the homepage');
});
app.delete("/delete/:type/:item", async (req, res) => {
    const item = req.params.item;
    const type = req.params.type;
    console.log(item, " ", type);
    dbfunc.DeleteFromDB(type, item);
    res.send("Item deleted");
});
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
