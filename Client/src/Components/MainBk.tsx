import { useState } from "react";
import Userbkmk from "./ui/Userbkmk";
import Explore from "./ui/Explore";
import useFetch from "../Components/Hooks/UseFetch";
import { LiaUserAltSolid } from "react-icons/lia";


// Main is where switch btw userbk and Explore Component
// and where Navbar is

// The Navbar can be a component on its own 
// but since it's small keep it in Mainbk

const MainBk = () => {
  const {loggingOut, userdata} = useFetch();
  const [ddowntoggle, setDdowntoggle] = useState(false);
  const [togglePage, setTogglePage] = useState(true);

  const toExplore = () =>{
    setTogglePage(false);
  }

  const toHome = () => {
    setTogglePage(true);
  }

  
    return (   
      <section className="pt-[56px] ">
        {/* NavBar  */}
        <nav className='flex fixed  w-full z-50 top-0 bg-[#6650df] h-[56px]  items-center '>
          <div className="w-full top-1 bg-violet-600 shadow-md blur fixed h-[56px] -z-50"></div>
          <h2 className="font-customtt font-extrabold text-2xl text-violet-50 p-5">BookMark.</h2>
          <h2 onClick={toExplore} className="text-white cursor-pointer ">Explore</h2>
          <button className=" ml-auto mr-4 relative" onClick={() => { setDdowntoggle(!ddowntoggle) }}>
            <div className="flex  p-2">
            <LiaUserAltSolid className="text-OvsP-o500 text-2xl "/>
            <p className="px-3 py-0 text-white font-semibold hover:text-orange-400">{userdata.name} </p>
            </div>
            

            <div className={`flex-col w-40 right-0 z-50 absolute ${ddowntoggle ? "flex" : "hidden"}`}>
              <button className="pr-5 pl-1 py-2 mx-3 bg-violet-100 text-left text-violet-900 hover:bg-violet-400 hover:text-white" onClick={toHome}>My Bookmarks </button>
              <button className="pr-5 pl-1 py-2 mx-3 bg-violet-100 text-left text-violet-900 hover:bg-violet-400 hover:text-white" onClick={loggingOut}>Logout</button>
            </div>

          </button>
        </nav>

        {/* switch btw Userbkmk, Explore */}
        <main className="w-[96%] mr-auto ml-auto ">
          {togglePage ? <Userbkmk /> : <Explore />}
        </main >
        
      </section>
    );
}
 
export default MainBk;