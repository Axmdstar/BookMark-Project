import { useContext, useState } from "react";
import { Usrcontext } from "./context";
import Userbkmk from "./ui/Userbkmk";
import Explore from "./ui/Explore";



const MainBk = () => {
  const {userdata} = useContext(Usrcontext);
  const [ddowntoggle, setDdowntoggle] = useState(false);
  const [togglePage, setTogglePage] = useState(true);

  const toExplore = () =>{
    setTogglePage(false);
  }

  const toHome = () => {
    setTogglePage(true);
  }

    return (   
        <>
        <nav className='flex relative bg-gradient-to-tl from-purple-200 to-yellow-200  h-[56px] items-center drop-shadow-lg'>
          <h2 className="font-customtt font-extrabold text-2xl text-yellow-950 p-5">Bookmark</h2>
          <h2 onClick={toExplore}>Explore</h2>
          <button className=" ml-auto mr-2 relative"  onClick={() =>{setDdowntoggle(!ddowntoggle)}}>
            <p className="px-3 font-semibold group-focus:text-purple-400"><span>📒</span>{userdata.name} </p>

            <div className={`flex-col right-0 z-50 absolute ${ddowntoggle ? "flex" :"hidden"}`}>
              <button className="pr-5 pl-1 py-2 mx-3 bg-purple-100 text-left text-purple-900 hover:bg-purple-400 hover:text-white" onClick={toHome}> Bookmarks </button>
              <button className="pr-5 pl-1 py-2 mx-3 bg-purple-100 text-left text-purple-900 hover:bg-purple-400 hover:text-white">setting</button>
              <button className="pr-5 pl-1 py-2 mx-3 bg-purple-100 text-left text-purple-900 hover:bg-purple-400 hover:text-white">Logout</button>
            </div>
          </button>
        </nav>

        <div>
        {togglePage ? <Userbkmk/> : <Explore/>}
        </div>  

           <footer className="p-3 text-center ">
              <p>@ Devaxmed</p>
              <p className="font-customtt">about by <br /> Axmed Faarax Maxamed</p>
           </footer>
        </>
      );
}
 
export default MainBk;