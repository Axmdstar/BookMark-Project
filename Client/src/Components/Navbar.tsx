import { useContext } from "react";
import { Usrcontext } from "./context";
import Userbkmk from "./ui/Userbkmk";



const MainBk = () => {
  const {userdata} = useContext(Usrcontext);

    return (   
        <>
        <nav className='flex bg-gradient-to-tl from-purple-200 to-yellow-200  h-[56px] items-center drop-shadow-lg  '>
          <h2 className="font-customtt font-extrabold text-2xl text-yellow-950 p-5">Bookmark</h2>

          <button className="group ml-auto mr-2 relative ">
            <p className="px-3 font-semibold group-focus:text-purple-400"><span>📒</span>{userdata.name} </p>

            <div className=" flex-col right-0 hidden group-focus:absolute group-focus:flex ">
              <button className="pr-5 pl-1 py-2 mx-3 bg-purple-100 text-left text-purple-900 hover:bg-purple-400 hover:text-white">Bookmarks</button>
              <button className="pr-5 pl-1 py-2 mx-3 bg-purple-100 text-left text-purple-900 hover:bg-purple-400 hover:text-white">setting</button>
              <button className="pr-5 pl-1 py-2 mx-3 bg-purple-100 text-left text-purple-900 hover:bg-purple-400 hover:text-white">Logout</button>
            </div>

          </button>
        </nav>
           {/* Add Routes here */}
           <Userbkmk></Userbkmk>

           <footer className="p-3 text-center ">
              <p>@ Devaxmed</p>
              <p className="font-customtt">about by <br /> Axmed Faarax Maxamed</p>
           </footer>
        </>
      );
}
 
export default MainBk;