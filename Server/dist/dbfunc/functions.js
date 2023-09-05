"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFromDB = exports.NewBkitem = exports.liked = exports.NewBk = exports.NewUser = exports.GetBkItems = exports.GetExploreBks = exports.GetUsrBk = exports.CheckId = exports.Checkuser = void 0;
const mysql2_1 = require("mysql2");
const dotenv_1 = __importDefault(require("dotenv"));
const nanoid_1 = require("nanoid");
dotenv_1.default.config();
const pool = (0, mysql2_1.createPool)({
    host: process.env.BM_HOST,
    user: process.env.BM_USER,
    password: process.env.BM_PWD,
    database: process.env.BM_DB //"bookmark"
}).promise();
//! Checks 
async function Checkuser(user) {
    // check case sensitivily with COLLATE utf8mb4_bin
    const stt = `SELECT * FROM user_tb where name COLLATE  utf8mb4_bin = "${user.usrname}" `;
    try {
        const [rows] = await pool.query(stt);
        //_______________ Debug _____________
        console.log("_____________________ GetUserByName Function _________________\n\n");
        console.log('rows :>> ', rows);
        const error = {};
        if (rows.length !== 0) {
            const { password } = rows[0];
            // check password 
            if (password === user.password) {
                return rows[0];
            }
            else {
                // send password error 
                error.message = "incorrect password";
                error.status = 401;
            }
        }
        else {
            // username not found 
            error.message = "incorrect username";
            error.status = 401;
        }
        pool.release();
        return error;
    }
    catch (error) {
        console.log("Error >>> \n", error);
        return "";
    }
}
exports.Checkuser = Checkuser;
async function CheckId(idUser) {
    const stt = `SELECT * FROM user_tb where idUser = "${idUser}" `;
    const [result] = await pool.query(stt);
    if (result.length == 0) {
        return false;
    }
    return true;
}
exports.CheckId = CheckId;
//! Gets 
async function GetUsrBk(UsrId) {
    const stt = `select bookmarkid, title, usrid, count(lk.bk) as likes from bm
                        left join like_tb as lk on lk.bk = bookmarkid
                        where usrid = "${UsrId}"
                        group by bookmarkid, title`;
    const [result] = await pool.query(stt);
    console.log("DB >>>: ", result);
    return result;
}
exports.GetUsrBk = GetUsrBk;
async function GetExploreBks() {
    const stt = `select b.bookmarkid, b.title, usr.name, count(lk.userid) as likes from bm as b
                         left join like_tb as lk on lk.bk = b.bookmarkid
                         left join user_tb as usr on usr.idUser = b.usrid
                         group by b.bookmarkid, b.title;`;
    const [result] = await pool.query(stt);
    console.log(result);
    return result;
}
exports.GetExploreBks = GetExploreBks;
async function GetBkItems(Bkid) {
    const stt = `select  bookmarkid, title, group_concat(distinct txt.paragraph SEPARATOR ';') as txt
    , group_concat(distinct lid.url SEPARATOR ';') as url
    , group_concat(distinct img.imageurl SEPARATOR ';' ) as imgs from bm
    left join image_tb as img on img.bmid = bookmarkid
    left join link_tb as lid on lid.bmid = bookmarkid
    left join text_tb as txt on txt.bmid = bookmarkid
    where bookmarkid = "${Bkid}"
    group by bookmarkid, title;`;
    const [result] = await pool.query(stt);
    const { txt, url, imgs, title, bookmarkid } = result[0];
    console.log("GetBKitems Function", result[0]);
    const arrResult = {
        title: title,
        bookmarkid: bookmarkid,
        url: url == null ? null : url.split(";"),
        txt: txt == null ? null : txt.split(";"),
        imgs: imgs == null ? null : imgs.split(";"),
    };
    return arrResult;
}
exports.GetBkItems = GetBkItems;
//! insert 
async function NewUser(data, id) {
    const stt = `insert into user_tb(idUser, name, password, email)
    values("${id}","${data.username}","${data.password}","${data.email}");
    `;
    try {
        const result = await pool.query(stt);
        return true;
    }
    catch (error) {
        console.log("Error");
        return false;
    }
}
exports.NewUser = NewUser;
async function NewBk(data) {
    const stt = `INSERT INTO bm(usrid, bookmarkid, title)
    values("${data.usrid}","${data.bookmarkid}","${data.title}");`;
    const result = pool.query(stt);
}
exports.NewBk = NewBk;
async function liked(ids) {
    const likeid = (0, nanoid_1.nanoid)();
    const stt = `Insert into like_tb(idLike, userid, bk)
                         values("${likeid}","${ids.usrid}","${ids.bkid}");`;
    console.log(stt);
    pool.query(stt);
}
exports.liked = liked;
async function NewBkitem(data) {
    let query;
    const itemId = (0, nanoid_1.nanoid)();
    switch (data.type) {
        case "Notes":
            query = `INSERT INTO text_tb(text_id, paragraph, bmid)
                      VALUES("${itemId}","${data.item}","${data.id}")`;
            break;
        case "Links":
            query = `INSERT INTO link_tb(link_id, url, bmid)
                     VALUES("${itemId}","${data.item}","${data.id}")`;
            break;
        case "Images":
            query = `INSERT INTO image_tb(image_id, imageurl, bmid)
                     VALUES("${itemId}","${data.item}","${data.id}")`;
            break;
        default:
            // Handle unexpected data.type values
            throw new Error(`Unexpected data.type: ${data.type}`);
    }
    const result = pool.query(query);
}
exports.NewBkitem = NewBkitem;
async function DeleteFromDB(type, item) {
    let query;
    switch (type) {
        case "Notes":
            query = `delete from text_tb
                     where paragraph = '${item}'`;
            break;
        case "Links":
            query = `delete from link_tb
                     where url = '${item}'`;
            break;
        case "Images":
            query = `delete from image_tb
                     where imageurl = '${item}'`;
            break;
        default:
            throw new Error(`Unexpected data.type: ${type}`);
            break;
    }
    pool.query(query);
}
exports.DeleteFromDB = DeleteFromDB;
