import { useEffect, useRef, useState } from "react";
import useFetch from "../Hooks/UseFetch";
import BackBtn from "./backbtn";
import { FaPlus, FaTrashCan } from "react-icons/fa6";


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
    removeItem : (type:string, id?:string) => void    
}

interface itemsCompProps{
    item:string,
    id:number,
    type:string,
    removeItem : (type:string, id?:string) => void
}

// input component that takes id
const Itemforminput = ({setInputValue}:{setInputValue:React.Dispatch<React.SetStateAction<string>>}) => {
    return (
        <input className="py-2 mx-2 px-9 w-full ring-2 ring-purple-300 rounded-md shadow-md" onChange={(e)=>setInputValue(e.target.value)}></input>
    );
}


const ImgComp = ({item, id, type, removeItem}:itemsCompProps) => {
    
    const divid = useRef<null | HTMLDivElement>(null);
    return (
        <div className="w-60 m-8 " id={id.toString()} ref={divid}>
            <div className="relative">
            <img src={item} alt="" className="bg-cover z-10"/>
            <FaTrashCan onClick={()=>{removeItem(type = type, divid.current?.id)}} className="absolute z-20 bottom-0 right-0 text-purple-400 ml-auto hover:text-purple-700  cursor-pointer"></FaTrashCan>
            </div>
        </div>
    );
}

const TxtComp = ({item, id, type, removeItem}:itemsCompProps) => {
    const divid = useRef<null | HTMLDivElement>(null);
    return (
        <div className="p-3 flex items-baseline" id={id.toString()} ref={divid}>
            <p>{item}</p>
            <FaTrashCan onClick={()=>{removeItem(type = type, divid.current?.id)}} className="text-purple-400 ml-auto hover:text-purple-700  cursor-pointer"></FaTrashCan>
        </div>
    )
    
}

 
const LinkComp = ({item, id, type, removeItem}:itemsCompProps) => {
    const divid = useRef<null | HTMLDivElement>(null);
    
    return (
        <div className="p-3 flex items-baseline " id={id.toString()} ref={divid} >
            <a href={item}>{item}</a>
            <FaTrashCan onClick={()=>{removeItem(type = type, divid.current?.id)}} className="text-purple-400 ml-auto hover:text-purple-700  cursor-pointer"></FaTrashCan>
        </div>
    )
    
}
 
const DropDowns = ({type , list, ItemtoDb, setInputValue, removeItem}:DropDownProps) =>
 {
    const [itemform, setItemform] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const buttonstyle = " px-12 w-40 py-2 text-white shadow-purple-400 hover:shadow-orange-300 duration-75 bg-OvsP-p500 shadow-md rounded-md text-lg hover:shadow-lg hover:bg-OvsP-o500 focus:bg-orange-500";


    return (
        <>
            <button className="p-4 shadow-inner shadow-purple-300 bg-gradient-to-l from-10% to-purple-50 from-purple-100 w-full font-bold text-left text-xl text-purple-800" onClick={()=> setDropdown(!dropdown)}>{type}</button>
            <div className={`flex  ${type == "Images"?"!flex-row items-center":"flex-col"}  bg-transparent transition-all ease-in-out duration-700  max-h-0 overflow-hidden ${dropdown && "max-h-screen"}`}>   
            {
                list?.map((item, id) => {
                    
                    switch (type) {
                        case "Notes":
                            return(<TxtComp type={type} item={item} id={id} removeItem={removeItem}/>)        
                            
                        case "Links":
                            return(<LinkComp type={type} item={item} id={id} removeItem={removeItem}/>)
                            
                        case "Images":
                            return(<ImgComp type={type} item={item} id={id} removeItem={removeItem}/>)
                    }
                })
            }
            
            <div className="self-center w-full py-9 pb-6 flex justify-center ">
                { itemform ? <div className="flex  w-9/12">
                    <Itemforminput setInputValue={setInputValue}/>
                    <button className={buttonstyle} onClick={() => {setItemform(!itemform); ItemtoDb({type:type})}}>add</button>
                    </div> 
                      : <button onClick={() => setItemform(!itemform)} className={buttonstyle}><FaPlus className=" mr-auto ml-auto text-white"/></button>   }
                    </div>
            </div>
        
        </>
    )
 }

const Bookmarkitems = ({back, currentid}: {currentid?:string, back:()=>void}) => {
    const {GetBkitems, setBkitems, Bkitems, NewItemtoDb} = useFetch();
    const [inputValue, setInputValue] = useState("");
    
    useEffect(() => {
        GetBkitems(currentid)
    },[])    

    // default argument
    const ItemtoDb = ({input = inputValue, id = currentid, type }:itemtodb = {}) => {
        
        if (Bkitems) {
            switch (type) {
                case "Notes":
                    const newtxt = [...Bkitems.txt,input];
                    setBkitems({...Bkitems,txt:newtxt});
                    break;

                case "Links":
                    const newlink = [...Bkitems.url,input];
                    setBkitems({...Bkitems,url:newlink});
                    break;
                    
                case "Images":
                    const newimg = [...Bkitems.imgs,input];
                    setBkitems({...Bkitems,imgs:newimg});
                    break;
            }
            NewItemtoDb(id, input, type);
        }
    }


    const removeItem = (type:string, id?:string) => {
            const intid = id ? parseInt(id) : 0;
            if (Bkitems) {
                switch (type) {
                    case "Notes":
                        const removed = [...Bkitems?.txt];
                        removed.splice(intid,1);
                        setBkitems({...Bkitems, txt:removed})    
                        break;
    
                    case "Links":
                        const removed1 = [...Bkitems?.url];
                        removed1.splice(intid,1);
                        setBkitems({...Bkitems, url:removed1})    
                        break;
                        
                    case "Images":
                        const removed2 = [...Bkitems?.imgs];
                        removed2.splice(intid,1);
                        setBkitems({...Bkitems, imgs:removed2})    
                        break;
                }
            }
            
            
            // setBkitems({...Bkitems, url:[...Bkitems?.url]})
    }
    // bg-gradient-to-b from-purple-700 to-15% to-OvsP-p500
    return ( 
        <>
            <div className=" pb-11">
                <div className="flex items-center rounded-md bg-purple-50 shadow-xl shadow-purple-300">
                    <BackBtn back={back}></BackBtn>
                    <h1 className="text-3xl text-OvsP-p500 p-4 pl-4 pb-5 font-sans">{Bkitems?.title}</h1>
                </div>

                <div className="mt-9 bg-transparent shadow-2xl shadow-purple-400 h-auto " >
                    <DropDowns type="Notes" removeItem={removeItem} list={Bkitems?.txt} ItemtoDb={ItemtoDb} setInputValue={setInputValue} />
                    <DropDowns type="Links" removeItem={removeItem} list={Bkitems?.url} ItemtoDb={ItemtoDb} setInputValue={setInputValue} />
                    <DropDowns type="Images" removeItem={removeItem} list={Bkitems?.imgs} ItemtoDb={ItemtoDb} setInputValue={setInputValue} />
                </div>
            </div>
        </>
     );
}
 
export default Bookmarkitems;