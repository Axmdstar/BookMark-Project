import { RowDataPacket } from "mysql2";

export interface getbks extends RowDataPacket {
    usrid : string,
    name?: string,
    bookmarkid : string,
    title : string,
    likes: number
}

export interface GetBkItemType extends RowDataPacket {
    bookmarkid: string,
    title: string,
    txt: string,
    url: string,
    imgs: string
};

export interface GetBkItemResult  {
    bookmarkid: string,
    title: string,
    txt: string[] | null,
    url: string[] | null,
    imgs: string[] | null
};


export interface Errortype {
    status: number,
    message: string
}
export interface usrtype extends RowDataPacket{
    usrid: string,
    email?:string,
    username: string,
    password: string
}

export interface NewItemdata {
    item_id:string,
    data:string,
    bmid:string
}


