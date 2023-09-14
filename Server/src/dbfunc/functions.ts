import { createPool, Pool } from "mysql2";
import dotenv from 'dotenv';
import { Errortype, GetBkItemResult, GetBkItemType, getbks, usrtype, NewBkitemType, likedtype } from "../Types/types";
import { nanoid } from "nanoid";



dotenv.config()
const pool = createPool({
    host: process.env.BM_HOST,
    user: process.env.BM_USER,
    password: process.env.BM_PWD,
    database: process.env.BM_DB
}).promise();



//! Checks 

export async function Checkuser(user: usrtype):Promise<any>{
    // check case sensitivily with COLLATE utf8mb4_bin
    const stt : string = `SELECT * FROM user_tb where name COLLATE  utf8mb4_bin = "${user.usrname}" `;
    try {
        // console.log(pool.connection);
        
        const [rows] = await pool.query<usrtype[]>(stt)
        //_______________ Debug _____________
        console.log("_____________________ GetUserByName Function _________________\n\n");
        console.log('rows :>> ', rows);

        const error = {} as Errortype

        if (rows.length !== 0) {
            const { password } = rows[0]

            // check password 
            if (password === user.password) {
                return rows[0]
            } else {
                // send password error 
                error.message = "incorrect password"
                error.status = 401
            }
        } else {
            // username not found 
            error.message = "incorrect username"
            error.status = 401
        }
        pool.release();
        return error
    } catch (error) {
        console.log("Error >>> \n", error);
        return "";
    }
    
     
}

export async function CheckId(idUser:string):Promise<boolean>{
    const stt : string = `SELECT * FROM user_tb where idUser = "${idUser}" `;
    const [result] = await pool.query<[]>(stt);

    console.log('result :>> ', result);
    if (result.length == 0) {
        return false
    }
    return true
} 


//! Gets 

export async function GetUsrBk(UsrId:string) {
    console.log("GetUsrBk() >>>>>>>")
    const stt:string = `select bookmarkid, title, usrid, count(lk.bk) as likes from bm
                        left join like_tb as lk on lk.bk = bookmarkid
                        where usrid = "${UsrId}"
                        group by bookmarkid, title`;
    try {
        const [result] = await pool.query<getbks[]>(stt);
        return result;

    } catch (error) {
        console.log('error :>> ', error);    
    }
    // console.log("DB >>>: ", result);

}

export async function GetExploreBks() {
    const stt: string = `select b.bookmarkid, b.title, usr.name, count(lk.userid) as likes from bm as b
                         left join like_tb as lk on lk.bk = b.bookmarkid
                         left join user_tb as usr on usr.idUser = b.usrid
                         group by b.bookmarkid, b.title;`;

    const [result] = await pool.query<getbks[]>(stt);
    console.log(result);
    return result;
}

export async function GetBkItems(Bkid:string): Promise<GetBkItemResult> {

    const stt:string = `select  bookmarkid, title, group_concat(distinct txt.paragraph SEPARATOR ';') as txt
    , group_concat(distinct lid.url SEPARATOR ';') as url
    , group_concat(distinct img.imageurl SEPARATOR ';' ) as imgs from bm
    left join image_tb as img on img.bmid = bookmarkid
    left join link_tb as lid on lid.bmid = bookmarkid
    left join text_tb as txt on txt.bmid = bookmarkid
    where bookmarkid = "${Bkid}"
    group by bookmarkid, title;`;

    
    const [result] = await pool.query<GetBkItemType[]>(stt);

    const {txt, url, imgs, title, bookmarkid} = result[0]
    console.log("GetBKitems Function", result[0]);

    const arrResult:GetBkItemResult = {
        title : title,
        bookmarkid: bookmarkid,
        url: url == null ? null : url.split(";"),
        txt: txt == null ? null : txt.split(";"),
        imgs: imgs == null ? null : imgs.split(";"),
    }
    return arrResult;
}




//! insert 
export async function NewUser(data:usrtype, id:string ): Promise<boolean> {
    const stt:string = `insert into user_tb(idUser, name, password, email)
    values("${id}","${data.username}","${data.password}","${data.email}");
    `;

    try {
        const result = await pool.query(stt);
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function NewBk(data:getbks) {
    const stt: string = `INSERT INTO bm(usrid, bookmarkid, title)
    values("${data.usrid}","${data.bookmarkid}","${data.title}");`;
    try {
        const result = pool.query(stt);

    } catch (error) {
        console.log(error);        
    }
}

export async function liked(ids:likedtype) {
    const likeid:string = nanoid();
    const stt: string = `Insert into like_tb(idLike, userid, bk)
                         values("${likeid}","${ids.usrid}","${ids.bkid}");`
    console.log(stt);
    pool.query(stt);
}

export async function NewBkitem(data: NewBkitemType) {
    let query:string;
    const itemId:string = nanoid();

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

export async function DeleteFromDB(type:string, item:string) {
    
    let query:string;

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