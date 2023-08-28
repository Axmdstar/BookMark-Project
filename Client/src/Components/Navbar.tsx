import { useContext, useState } from "react";
import { Usrcontext } from "./context";
import Userbkmk from "./ui/Userbkmk";
import Explore from "./ui/Explore";
import axios from "axios";



const MainBk = () => {
  const {userdata,setUserdata} = useContext(Usrcontext);
  const [ddowntoggle, setDdowntoggle] = useState(false);
  const [togglePage, setTogglePage] = useState(true);

  const toExplore = () =>{
    setTogglePage(false);
  }

  const toHome = () => {
    setTogglePage(true);
  }

  const loggingOut = () => {
    axios.get("/LogOut")
      .then((res) => {
        console.log(res);
        setUserdata({name:"", idUser:"", auth:false});
      })
  }

    return (   
      <div className="pt-[56px] ">
        <nav className='flex fixed  w-full z-50 top-0 bg-violet-600 h-[56px]  items-center '>
          <div className="w-full top-1 bg-OvsP-p500 shadow-md blur fixed h-[56px] -z-50"></div>
          <h2 className="font-customtt font-extrabold text-2xl text-purple-50 p-5">Bookmark</h2>
          <h2 onClick={toExplore} className="text-white">Explore</h2>
          <button className=" ml-auto mr-2 relative" onClick={() => { setDdowntoggle(!ddowntoggle) }}>
            <p className="px-3 text-white font-semibold group-focus:text-purple-400"><span>📒</span>{userdata.name} </p>

            <div className={`flex-col right-0 z-50 absolute ${ddowntoggle ? "flex" : "hidden"}`}>
              <button className="pr-5 pl-1 py-2 mx-3 bg-purple-100 text-left text-purple-900 hover:bg-purple-400 hover:text-white" onClick={toHome}> Bookmarks </button>
              <button className="pr-5 pl-1 py-2 mx-3 bg-purple-100 text-left text-purple-900 hover:bg-purple-400 hover:text-white">setting</button>
              <button className="pr-5 pl-1 py-2 mx-3 bg-purple-100 text-left text-purple-900 hover:bg-purple-400 hover:text-white" onClick={loggingOut}>Logout</button>
            </div>
          </button>
        </nav>

        <div className="w-[96%] mr-auto ml-auto ">
          {togglePage ? <Userbkmk /> : <Explore />}
        </div >

      
      </div>
      );
}
 
export default MainBk;