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
        <nav className='flex fixed  w-full z-50 top-0 bg-[#6650df] h-[56px]  items-center '>
          <div className="w-full top-1 bg-violet-600 shadow-md blur fixed h-[56px] -z-50"></div>
          <h2 className="font-customtt font-extrabold text-2xl text-violet-50 p-5">BookMark.</h2>
          <h2 onClick={toExplore} className="text-white cursor-pointer ">Explore</h2>
          <button className=" ml-auto mr-2 relative" onClick={() => { setDdowntoggle(!ddowntoggle) }}>
          <p className="px-3 text-white font-semibold hover:text-orange-400"><span>📒</span>{userdata.name} </p>

            <div className={`flex-col w-40 right-0 z-50 absolute ${ddowntoggle ? "flex" : "hidden"}`}>
              <button className="pr-5 pl-1 py-2 mx-3 bg-violet-100 text-left text-violet-900 hover:bg-violet-400 hover:text-white" onClick={toHome}>My Bookmarks </button>
              <button className="pr-5 pl-1 py-2 mx-3 bg-violet-100 text-left text-violet-900 hover:bg-violet-400 hover:text-white" onClick={loggingOut}>Logout</button>
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