import { useEffect, useState } from "react";
import useFetch from "../Hooks/UseFetch";
import Bkcard  from "./bkcard";
import Bkitems from "./bkitems";
import { nanoid } from "nanoid";
import {FaPlus} from 'react-icons/fa6'
import { LoadingOrbit} from './LoadingsAnime';

// Userbkmk is where user can view his own bookmark 
// and create new Bookmarks. when selected render Bookmarkitems

// if addform is true it will render addNewBk form to add your
// new bookmark

const Userbkmk = () => {
    const {bkarr, userdata, SendToDb, setBkarr, userBookmarks, GetBkid, bkselected, currentid, back, Loading} = useFetch();
    const [addform, setAddform] = useState(false);
    const [newtitle, setNewtitle] = useState("");
    
    useEffect(()=>{
        userBookmarks();
    },[])

    const addNewBk = () => {
        const title:string = newtitle;
        const bkid:string = nanoid();
        const usrid:string = userdata.idUser;
        const newbk = {bookmarkid:bkid, title, usrid, likes: 0};

        if (bkarr == undefined) {
            setBkarr([newbk]);
        } else {
            
            setBkarr([...bkarr, newbk]);
        }
        SendToDb(newbk);
        setAddform(!addform)
    };

    if (addform) {
        return(
            <div className="m-auto py-5 sm:w-1/2  flex flex-col items-center">
                <h2 className=" pb-10 text-3xl text-purple-700 font-semibold font-sans"
                >Create New Bookmark</h2>

                <input type="text" onChange={(e) => setNewtitle(e.target.value)}
                className=" py-3 w-full text-center drop-shadow-lg focus:ring-4 ring-violet-300 rounded-md outline-none font-medium"
                />

                <br/>

                <div className="grid grid-cols-2 w-full gap-2">

                    <button type="button" onClick={addNewBk}
                    className="mb-2 block w-full rounded bg-violet-600 px-6 pb-2 pt-2.5 sm:text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-violet-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-violet-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-violet-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >Add</button>

                    <button onClick={() => setAddform(!addform)}
                    className="mb-2 block w-full rounded bg-violet-600 px-6 pb-2 pt-2.5 sm:text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-violet-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-violet-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-violet-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >Cancel</button>

                </div>
            </div>
        )
    }
    

    const buttonstyle =" flex w-14 justify-center py-2 shadow-violet-400 hover:shadow-orange-300 duration-75 bg-violet-600 shadow-md rounded-md text-lg hover:shadow-lg hover:bg-OvsP-o500 focus:bg-orange-500";

    return ( 
    <div className="py-3 ">
        <h1 className="p-5 pl-0 py-7 text-3xl font-semibold font-customtt text-orange-400">Your Bookmarks</h1>
        
        <div className="m-auto  pt-4 relative flex flex-col gap-5">
            {!bkselected && <div className="w-full self-baseline">
                    <button className={buttonstyle} onClick={() => setAddform(!addform)}>
                        <FaPlus color="white" />
                    </button>
                 </div>
            }
            {/* switch */}
            {bkselected ?
             <Bkitems currentid={currentid} back={back} access={true}/> :
            <> 
              { Loading ? <LoadingOrbit/> :<Bkcard bkarr={bkarr} GetBkid={GetBkid}/>} 
            </> }
        </div>
        
    </div>
     );
}
 
export default Userbkmk;