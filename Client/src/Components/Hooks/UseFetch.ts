import { useContext, useState } from "react";
import { Usrcontext } from "../context";
import axios from 'axios';

interface bkarrobj {
    bookmarkid : string,
    userName?: string,
    title : string,
    usrid: string,
    likes:number
}


interface BkitemType {
    title: string,
    bookmarkid: string,
    url: string[],
    txt: string[],
    imgs: string[]
}

const useFetch = () => {

    const {userdata, setUserdata} = useContext(Usrcontext);
    const [bkarr, setBkarr] = useState<bkarrobj[]>();
    const [Bkitems, setBkitems] = useState<BkitemType>();
    const [currentid, setCurrentid] = useState<string>("");
    const [bkselected, setBkselected] = useState(false);
    const [ErrMge, setErrMge] = useState("");
    const [Loading, setLoading] = useState(false);

    //! Items In the bk state here 

    // Checks the user Cookies 
    const BrowserInfo = () => {
            
            axios.get("/browserinfo")
              .then((res) => {
                console.log('result for browser Info :>> ', res);
                if (res.data.auth) {
                  setUserdata(res.data)
                }
              })
              .catch(() => setErrMge("Failed to Connect to the Server!!"))            
    }

    // User Profile Bookmark 
    const userBookmarks = () => {

        const endpoint: string = `/getbks/${userdata.idUser}`;
        setLoading(true);

        axios.get(endpoint)
            .then((res) => {
                //! res will be a array of bkmk.
                if (res.data !== "") {

                    console.log("bk result, Number of bk", res.data.length, res);
                    setLoading(false);
                    res.data.length === 0 ? setBkarr(undefined) : setBkarr(res.data);      
                }
            })
            .catch((err) => console.log(err))
        
    }

    const ExplorePage = () => {
        const endpoint: string = "/getExplore";
        setLoading(true);
        axios.get(endpoint)
            .then( (res) => {
                setLoading(false);
                setBkarr(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const GetBkid = (e:React.MouseEvent) => {
        const Bkid: string = e.currentTarget.id;
        setCurrentid(Bkid)
        setBkselected(true);
    }

    const back =  () =>{
        setBkselected(false);
        console.log("Was Clicked");
        console.log(bkselected);
    }

    const GetBkitems = (id?:string) => {
        const endpoint: string = `/getItems/${id}`;
        setLoading(true)
        axios.get(endpoint)
        .then((res) => {
            // console.log("Bk Items Array ",res.data);
            setLoading(false)
            setBkitems(res.data);
        })
        .catch((err) => console.log(err))
    }
         
    
    const SendToDb = (data:bkarrobj) => {
        console.log("sendtoDB >>: ", data);
        axios.post("/addBk",data)
            .then((res) =>{
                console.log("New Bk res >>>: ", res);
            })
    }

    const NewItemtoDb = (id:string | undefined, item:string, type?:string) => {
        const endpoint: string = `/additem`;
        const payload = {
            id,
            item,
            type
        }
        axios.post(endpoint,payload)
            .then((res) => {
                console.log(res);
            })
    }

    const Deleteitemdb = (item:string, type:string) => {
        console.log(item, type);
        if (type == "Images" || "Links") {
            item = encodeURIComponent(item);
        }
        const endpoint:string = `/delete/${type}/${item}`;
        axios.delete(endpoint)
            .then((res) => {
                console.log(res);
            })
    }

    const liked = (bkid:string, usrid:string = userdata.idUser) => {
        console.log('bkid, usrid :>> ', bkid, usrid);

        const endpoint:string = "/like";
        const payload = {bkid, usrid}
        axios.post(endpoint, payload)
            .then((res) => {
                console.log("success");
                console.log(res);
            })
    }


    return {
        userdata,
        bkarr,
        bkselected,
        Bkitems,
        currentid,
        ErrMge,
        liked,
        setBkselected,
        setBkitems,
        ExplorePage,
        setBkarr,
        SendToDb,
        GetBkid,
        GetBkitems,
        Deleteitemdb,
        userBookmarks,
        BrowserInfo,
        NewItemtoDb,
        back,
        Loading
    }
    
}

export default useFetch