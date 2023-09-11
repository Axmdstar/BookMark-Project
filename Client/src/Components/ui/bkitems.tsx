import { useEffect, useState } from "react";
import useFetch from "../Hooks/UseFetch";
import {DropDowns} from './DropDown';
import BackBtn from "./backbtn";
import { LoadingPulse } from './LoadingsAnime';

// Bookmarkitems views all the items in the bk in DropDowns
// Component, props back, currentid.
// back changes the bkselected true or false 
// currentid bk id to search

interface itemtodb {
    input?: string,
    id?: string,
    type?: string 
}

const Bkitems = ({back, currentid, access}: {currentid?:string, back:()=>void, access:boolean}) => {
    const {GetBkitems, setBkitems, Bkitems, NewItemtoDb, Deleteitemdb, Loading} = useFetch();
    const [inputValue, setInputValue] = useState("");
    
    useEffect(() => {
        GetBkitems(currentid)
    },[])    

    // default argument
    const ItemtoDb = ({input = inputValue, id = currentid, type }:itemtodb = {}) => {
        if (Bkitems) {
            switch (type) {
                case "Notes":
                    let newtxt: string[];
                    Bkitems.txt ? newtxt = [...Bkitems.txt,input] : newtxt = [input];
                    setBkitems({...Bkitems,txt:newtxt});
                    break;

                case "Links":
                    let newlink: string[];
                    Bkitems.url ? newlink = [...Bkitems.url,input] : newlink = [input];
                    setBkitems({...Bkitems,url:newlink});
                    break;
                    
                case "Images":
                    
                    let newimg: string[];
                    Bkitems.imgs ? newimg = [...Bkitems.imgs,input] : newimg = [input];
                    setBkitems({...Bkitems,imgs:newimg});
                    break;
            }
            NewItemtoDb(id, input, type);
        }
    }


    const removeItem = (type: string, id?: string) => {
        const intid = id ? parseInt(id) : 0;
        if (Bkitems) {
            switch (type) {
                case "Notes":
                    const removed = [...Bkitems?.txt];
                    removed.splice(intid, 1);
                    Deleteitemdb(Bkitems.txt[intid], type);
                    setBkitems({ ...Bkitems, txt: removed })
                break;

                case "Links":
                    const removed1 = [...Bkitems?.url];
                    removed1.splice(intid, 1);
                    Deleteitemdb(Bkitems.url[intid], type);
                    setBkitems({ ...Bkitems, url: removed1 })
                break;

                case "Images":
                    const removed2 = [...Bkitems?.imgs];
                    removed2.splice(intid, 1);
                    Deleteitemdb(Bkitems.imgs[intid], type);
                    setBkitems({ ...Bkitems, imgs: removed2 })
                break;
            }
        }
    }
    
    return ( 
        <>
            <div className=" pb-11">
                <div className="flex items-center rounded-md bg-violet-50 shadow-xl shadow-violet-300">
                    <BackBtn back={back}></BackBtn>
                    <h1 className="text-3xl text-OvsP-p500 p-4 pl-4 pb-5 font-sans">{Loading ? <LoadingPulse/> :Bkitems?.title}</h1>
                </div>

                <div className="mt-9 bg-transparent shadow-2xl shadow-violet-400 h-auto " >
                    <DropDowns access={access} type="Notes" removeItem={removeItem} list={Bkitems?.txt} ItemtoDb={ItemtoDb} setInputValue={setInputValue} />
                    <DropDowns access={access} type="Links" removeItem={removeItem} list={Bkitems?.url} ItemtoDb={ItemtoDb} setInputValue={setInputValue} />
                    <DropDowns access={access} type="Images" removeItem={removeItem} list={Bkitems?.imgs} ItemtoDb={ItemtoDb} setInputValue={setInputValue} />
                    <p>You can Only Add Image Address links example:https://images-eds-ssl.xboxlive.com/image?url&h=1080&w=1920&format=jpg</p>
                </div>
            </div>
        </>
     );
}
 
export default Bkitems;