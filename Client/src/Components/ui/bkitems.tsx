import { useEffect, useState } from "react";
import useFetch from "../Hooks/UseFetch";
import BackBtn from "./backbtn";
import { FaPlus } from "react-icons/fa6";


interface itemtodb {
    input?: string,
    id?: string,
    type?: string 
}


// input component that takes id
const Itemforminput = ({setInputValue}:{setInputValue:React.Dispatch<React.SetStateAction<string>>}) => {
    return (
        <input onChange={(e)=>setInputValue(e.target.value)}></input>
    );
}


const ImgComp = ({img}:{img:string}) => {
    // <img src={lk} alt="" />
    return (
        <div>
            <img src={img} alt="" />
        </div>
    );
}

const TxtComp = ({txt}:{txt:string}) => {

    return (
        <div>
            <p>{txt}</p>
        </div>
    )
    
}

const LinkComp = ({lnk}:{lnk:string}) => {
    return (
        <div>
            <a href={lnk}>{lnk}</a>
        </div>
    )
    
}
 



 const DropDowns = ({type ,list , ItemtoDb, setInputValue}:{type:string,list?:string[], ItemtoDb:({input,id,type}:itemtodb)=>void,setInputValue:React.Dispatch<React.SetStateAction<string>>}) =>
 {
    const [itemform, setItemform] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    return (
        <div>
            <button className="bg-gray-100 peer" onClick={()=> setDropdown(!dropdown)}>{type}</button>
            <div className={`flex flex-col transition-all ease-in-out duration-700 max-h-0 overflow-hidden ${dropdown && "max-h-screen"}`}>
                
            {
                list?.map((item) => {
                    
                    switch (type) {
                        case "Notes":
                            return(<TxtComp txt={item}/>)        
                            
                        case "Links":
                            return(<LinkComp lnk={item}/>)
                            
                        case "Images":
                            return(<ImgComp img={item}/>)
                    }
                })
            }
            
            <div className="self-center">
                { itemform ? <div className="flex flex-col items-center">
                    <Itemforminput setInputValue={setInputValue}/>
                    <button onClick={() => {setItemform(!itemform); ItemtoDb({type:type})}}>add</button>
                    </div> 
                    : <button onClick={() => setItemform(!itemform) }><FaPlus/></button>   }
            </div>
            </div>
        </div>
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
            
            console.log('type :>> ', type);
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
    
    return ( 
        <>
            <BackBtn back={back}></BackBtn>
            <div className="h-auto">
                <h1 className="text-xl p-4 font-bold bg-white drop-shadow-lg ">{Bkitems?.title}</h1>
                
                <DropDowns type="Notes" list={Bkitems?.txt} ItemtoDb={ItemtoDb} setInputValue={setInputValue} />
                <DropDowns type="Links" list={Bkitems?.url} ItemtoDb={ItemtoDb} setInputValue={setInputValue} />
                <DropDowns type="Images" list={Bkitems?.imgs} ItemtoDb={ItemtoDb} setInputValue={setInputValue} />
            </div>
        </>
     );
}
 
export default Bookmarkitems;