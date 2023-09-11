import {ImgComp, TxtComp, LinkComp} from "./ItemsComp";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

interface itemtodb {
    input?: string,
    id?: string,
    type?: string 
}

interface DropDownProps {
    type: string,
    list?: string[],
    ItemtoDb: ({input, id, type}:itemtodb)=>void,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    removeItem : (type:string, id?:string) => void,
    access: boolean    
}

// input component that takes id
const Itemforminput = ({setInputValue}:{setInputValue:React.Dispatch<React.SetStateAction<string>>}) => {
    return (
        <input className="py-2 mx-2 px-9 w-full ring-2 ring-violet-300 rounded-md shadow-md" onChange={(e)=>setInputValue(e.target.value)}></input>
    );
}

export const DropDowns = ({type , list, ItemtoDb, setInputValue, removeItem, access}:DropDownProps) =>
 {
    const [itemform, setItemform] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const buttonstyle = " px-12 w-40 py-2 text-white shadow-violet-400 hover:shadow-orange-300 duration-75 bg-OvsP-p500 shadow-md rounded-md text-lg hover:shadow-lg hover:bg-OvsP-o500 focus:bg-orange-500";


    return (
        <>
            <button className="p-4 shadow-inner shadow-violet-300 bg-gradient-to-l from-10% to-violet-50 from-violet-100 w-full font-bold text-left text-xl text-violet-800" onClick={()=> setDropdown(!dropdown)}>{type}</button>
            <div className={`flex  ${type == "Images"?"!flex-row items-center":"flex-col"}  bg-transparent transition-all ease-in-out duration-700  max-h-0 overflow-hidden ${dropdown && "max-h-screen"}`}>   
            {
                list?.map((item, id) => {
                    
                    switch (type) {
                        case "Notes":
                            return(<TxtComp type={type} item={item} id={id} removeItem={removeItem} access={access}/>)        
                            
                        case "Links":
                            return(<LinkComp type={type} item={item} id={id} removeItem={removeItem} access={access}/>)
                            
                        case "Images":
                            return(<><ImgComp type={type} item={item} id={id} removeItem={removeItem} access={access}/><p>You can only Copy Image Links and add Them to you bookmark</p></>)
                    }
                })
            }
            
            <div className="self-center w-full py-9 pb-6 flex justify-center ">
                    {itemform ?
                        <div className="flex  w-9/12">
                            <Itemforminput setInputValue={setInputValue} />
                            <button className={buttonstyle} onClick={() => { setItemform(!itemform); ItemtoDb({ type: type }) }}>add</button>
                        </div> :
                        <>{access && <button onClick={() => setItemform(!itemform)} className={buttonstyle}><FaPlus className=" mr-auto ml-auto text-white" /></button>}</>
                    }
                    </div>
            </div>
        
        </>
    )
 }