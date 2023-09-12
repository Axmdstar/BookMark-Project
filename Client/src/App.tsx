import './App.css'
import { Forms } from './Components/Forms'
import useFetch from './Components/Hooks/UseFetch';
import { useEffect } from 'react';
import MainBk from './Components/MainBk';
import {FaInstagram, FaFacebook, FaYoutube, FaGithub} from 'react-icons/fa6'

//* to-dos
//* home page
//* Loading state or page of skelaten 
// ! add isloading state in the useFetch()
//* ? About
//* redesign userpage, explorepage, itemspage
// Logout
//* setting ? why
//* proper footer 
//* fix dropdown still focus when changing pages
// Show Errors in Ui
// signup
// check password and username is empty
// user homepage when logged-in
// user home
//  add text,link,image comp
// bk like
// explore other users
// select like and expect



function App() {
  // Custom Hook
  const{ userdata, BrowserInfo, ErrMge } = useFetch()
  
  useEffect(() => {
    BrowserInfo();
  },[])   
  
  // when browserinfo fails to connect to the server 
  if (ErrMge) {
    alert(ErrMge)
  }

  return (
    <>
      <div className=' bg-gradient-to-b from-slate-50 to-violet-200 overflow-auto h-screen  '>
        {/* switch btw Mainbk and user Forms */}
        {userdata.auth ? <MainBk /> : <Forms />}

        <footer className="p-4 pb-3 text-center text-violet-700 sm:pt-[10px] lg:pt-[120px] ">
          <div className='flex gap-7 justify-center text-4xl mb-3'>
            <a href="https://instagram.com/devaxmed?igshid=Mzc0YWU1OWY="><FaInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=100058699734587"><FaFacebook/></a>
            <a href="https://youtube.com/@devaxd4889?si=jUcygFfzbD1ZRuH_"><FaYoutube/></a>
            <a href="https://github.com/Axmdstar/BookMark-Project"><FaGithub/></a>
          </div>
          <p className='text-gray-700'>By Ahmed Fareh </p>
        </footer>

      </div>
    </>
  )
}

export default App
