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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Like = exports.AddItem2Bk = exports.AddBk = exports.GetItems = exports.GetBks = exports.GetExploreBks = exports.BrowserInfo = exports.SignUp = exports.LogIn = exports.LogOut = void 0;
const dbfunc = __importStar(require("../dbfunc/functions"));
const jwt = __importStar(require("jsonwebtoken"));
const nanoid_1 = require("nanoid");
const CreateToken = (payload) => {
    const secret = "devaxmed";
    const expires = 60 * 60;
    const token = jwt.sign({ payload }, secret, { expiresIn: expires });
    console.log("Token >>>> ", token);
    console.log("Payload >>>> ", payload);
    return token;
};
const LogOut = (req, res) => {
    console.log(req.cookies.bookmark);
    res.cookie("bookmark", req.cookies, { maxAge: 0, httpOnly: true });
    res.send("why");
};
exports.LogOut = LogOut;
const LogIn = async (req, res, next) => {
    console.log("Got the data from formsData ");
    // const {UserName, Password} = req.body
    let check;
    try {
        check = await dbfunc.Checkuser(req.body);
    }
    catch (error) {
        console.log("Failed to Connect to the database");
        next(error);
    }
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
};
exports.LogIn = LogIn;
const SignUp = async (req, res) => {
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
};
exports.SignUp = SignUp;
const BrowserInfo = (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'https://bookmarks-devaxmed.onrender.com');
    res.send(req.userauth);
};
exports.BrowserInfo = BrowserInfo;
const GetExploreBks = async (req, res) => {
    const Bks = await dbfunc.GetExploreBks();
    console.log(Bks);
    res.send(Bks);
};
exports.GetExploreBks = GetExploreBks;
const GetBks = async (req, res) => {
    const usrid = req.params.id;
    const result = await dbfunc.GetUsrBk(usrid);
    res.status(200).send(result);
};
exports.GetBks = GetBks;
const GetItems = async (req, res) => {
    const Bkid = req.params.id;
    const result = await dbfunc.GetBkItems(Bkid);
    res.status(200).send(result);
};
exports.GetItems = GetItems;
// CURD
const AddBk = async (req, res) => {
    console.log("New Bookmark", req.body);
    dbfunc.NewBk(req.body);
    res.status(200).send('POST request to the homepage');
};
exports.AddBk = AddBk;
const AddItem2Bk = async (req, res) => {
    console.log('req.body :>> ', req.body);
    dbfunc.NewBkitem(req.body);
};
exports.AddItem2Bk = AddItem2Bk;
const Like = async (req, res) => {
    dbfunc.liked(req.body);
    res.send('POST request to the homepage');
};
exports.Like = Like;
const Delete = async (req, res) => {
    const item = req.params.item;
    const type = req.params.type;
    console.log(item, " ", type);
    dbfunc.DeleteFromDB(type, item);
    res.send("Item deleted");
};
exports.Delete = Delete;
