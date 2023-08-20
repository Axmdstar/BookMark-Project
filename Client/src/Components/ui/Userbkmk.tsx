import { useEffect, useState } from "react";
import useFetch from "../Hooks/UseFetch";
import Bkcard  from "./bkcard";
import Bookmarkitems from "./bkitems";
import { nanoid } from "nanoid";
import {FaPlus} from 'react-icons/fa6'


 
const Userbkmk = () => {
    // States 
    const {bkarr,userdata, SendToDb ,setBkarr, userBookmarks, GetBkid,bkselected, currentid, back} = useFetch();
    const [addform, setAddform] = useState(false);
    const [newtitle, setNewtitle] = useState("");
    

    console.log("bkArr >> :", bkarr);

    useEffect(()=>{
        userBookmarks();
    },[])

    
    // Functions 
    // {bookmarkid: 'asdfg', title: 'Demo', usrid: 'qazxsw', likes: 1}
    const addNewBk = () => {
        const title:string = newtitle;
        const bkid:string = nanoid();
        const usrid:string = userdata.idUser;
        

        if (bkarr == undefined) {
            setBkarr([{bookmarkid:bkid, title, usrid, likes: 0}]);
        } else {
            const newbk = {bookmarkid:bkid, title, usrid, likes: 0} ;
            setBkarr([...bkarr, newbk]);
            // data to db 
            SendToDb(newbk);
        }

        setAddform(!addform)
    };

    if (addform) {
        return(
            <div className="m-auto py-5 w-1/2 flex flex-col items-center">
                <h2
                    className=" pb-10 text-3xl font-semibold font-sans"
                >Create New Bookmark</h2>
                <input type="text" onChange={(e) => setNewtitle(e.target.value)}
                    className=" py-3 w-1/2 text-center drop-shadow-lg focus:ring-4 ring-purple-300 rounded-sm outline-none font-medium"
                />
                <br />
                <div className="grid grid-cols-2 w-full gap-2">
                    <button type="button" onClick={addNewBk}
                        className="mb-2 block w-full rounded bg-purple-600 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-purple-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-purple-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-purple-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >Add</button>
                    
                    <button onClick={() => setAddform(!addform)}
                        className="mb-2 block w-full rounded bg-purple-600 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-purple-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-purple-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-purple-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >Cancel</button>
                </div>
            </div>
        )
    }
    
    // style var 
    const buttonstyle = "w-full bg-purple-300 flex justify-center py-2 mt-2 rounded-md text-lg hover:bg-purple-400 focus:bg-purple-500";

    return ( 
    <div className="py-3 bg-gradient-to-b from-white  via-purple-100 h-screen ">
        <h1 className="p-5 text-3xl font-semibold font-customtt text-purple-900">Your Bookmarks</h1>
        
        <div className="w-[96%] h-screen m-auto relative ">
            {bkselected ? <Bookmarkitems currentid={currentid} back={back}/> : <Bkcard bkarr={bkarr} GetBkid={GetBkid} /> }
            {!bkselected && <button className={buttonstyle} onClick={() => setAddform(!addform)}> <FaPlus color="white"/></button>}
        </div>
        
    </div>
     );
}
 
export default Userbkmk;