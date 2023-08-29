import { useState } from "react";
import Login from "./Login";
import { SignUp } from "./SignUp";
// import useFetch from "./Hooks/UseFetch";


export const Forms  = () => {
    // const{ErrMge} = useFetch();

    const [Signing, setSigning] = useState(false);    
    return ( 
        <div style={{ backgroundImage: "url(/image/bg.jpg)"}} className="bg-auto bg-center h-screen flex flex-col items-center justify-center ">
            
            <div className=" pt-16 mr-7 md:mr-6">
               {Signing ? <SignUp setSigning={setSigning}/> : <Login setSigning={setSigning}/>}
            </div>
                 
        </div>
     );
}
 
