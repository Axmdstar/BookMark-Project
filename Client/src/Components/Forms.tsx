import { useState } from "react";
import Login from "./Login";
import { SignUp } from "./SignUp";
// import useFetch from "./Hooks/UseFetch";


export const Forms  = () => {
    // const{ErrMge} = useFetch();

    const [Signing, setSigning] = useState(false);
        
    return ( 
        <div  className="bg-auto bg-center h-screen w-full flex flex-col items-center justify-center ">
            
            <div className=" h-1/5 ">
                <h1 className="font-customtt text-6xl text-violet-700 drop-shadow-md font-extrabold">BookMarks.</h1>
                <p className=" text-orange-500">Where you share your Notes.</p>
            </div>

            <div className=" ">
               {Signing ? <SignUp setSigning={setSigning}/> : <Login setSigning={setSigning}/>}
            </div>
                 
        </div>
     );
}
 
