import { useRef } from "react";
import { FaTrashCan } from "react-icons/fa6";


interface itemsCompProps{
    item:string,
    id:number,
    type:string,
    removeItem : (type:string, id?:string) => void
}


export const ImgComp = ({item, id, type, removeItem}:itemsCompProps) => {
    
    const divid = useRef<null | HTMLDivElement>(null);
    return (
        <div className="w-60 m-8 " id={id.toString()} ref={divid}>
            <div className="relative">
            <img src={item} alt="" className="bg-cover z-10"/>
            <FaTrashCan onClick={()=>{removeItem(type = type, divid.current?.id)}} className="absolute z-20 bottom-0 right-0 text-violet-400 ml-auto hover:text-violet-700  cursor-pointer"></FaTrashCan>
            </div>
        </div>
    );
}

export const TxtComp = ({item, id, type, removeItem}:itemsCompProps) => {
    const divid = useRef<null | HTMLDivElement>(null);
    return (
        <div className="p-3 flex items-baseline" id={id.toString()} ref={divid}>
            <p>{item}</p>
            <FaTrashCan onClick={()=>{removeItem(type = type, divid.current?.id)}} className="text-violet-400 ml-auto hover:text-violet-700  cursor-pointer"></FaTrashCan>
        </div>
    )
}

 
export const LinkComp = ({item, id, type, removeItem}:itemsCompProps) => {
    const divid = useRef<null | HTMLDivElement>(null);
    
    return (
        <div className="p-3 flex items-baseline " id={id.toString()} ref={divid} >
            <a href={item}>{item}</a>
            <FaTrashCan onClick={()=>{removeItem(type = type, divid.current?.id)}} className="text-violet-400 ml-auto hover:text-violet-700  cursor-pointer"></FaTrashCan>
        </div>
    )
}