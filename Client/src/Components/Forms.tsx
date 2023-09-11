import { useState } from "react";
import Login from "./Login";
import { SignUp } from "./SignUp";


export const Forms  = () => {
    // to switch btw SignUp and Login
    const [Signing, setSigning] = useState(false);
    const [lang, setlang] = useState(true);
    const [langtitle, setlangtitle] = useState("Som");

    // Eng = true
    // Som = false

    const changelang = () => {
        setlang(!lang);
        if (lang) {
            setlangtitle("Eng");
        } else {
            setlangtitle("Som");
        }
    }
        
    return ( 
        <section  className="  h-screen w-full flex flex-col items-center justify-center  ">
            {/* App title  */}
            <div className=" w-[300px] block">
                <h1 className="font-customtt text-6xl text-violet-700 drop-shadow-md font-extrabold">BookMarks.</h1>
                <p className=" text-orange-500">Where you share your Notes.</p>
                <div className="w-auto  py-5 h-64">
                    <button className="ml-auto block w-10 bg-violet-500 rounded-md text-white py-1 ease-in-out hover:bg-violet-800 hover:shadow-none shadow-md shadow-violet-700" onClick={()=> changelang()}>{langtitle}</button>
                    <p className={`py-2 text-violet-700 drop-shadow-sm font-light ${!lang && "hidden"}`}>Bookmarks is like a special tool on the computer that helps you remember your favorite websites. You can save not just the website, but also your thoughts, pictures, and even see what other people like.</p>
                    <p className={`py-2 text-violet-700 drop-shadow-sm font-light ${lang && "hidden"}`}>Bookmarks waa sida qalab gaar ah oo kumbiyuutarka ku jira oo kaa caawinaya inaad xasuusato mareegaha aad jeceshahay. Ma badbaadin kartid bogga internetka oo kaliya, laakiin sidoo kale fikradahaaga, sawiradaada, iyo xitaa waxaad arki kartaa waxa ay dadka kale jecel yihiin.</p>
                </div>
            </div>

            <div className="w-[300px]">
               {Signing ? <SignUp setSigning={setSigning}/> : <Login setSigning={setSigning}/>}
            </div>
                 
        </section>
     );
}
 
