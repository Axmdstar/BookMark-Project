import './App.css'
import { Forms } from './Components/Forms'
import useFetch from './Components/Hooks/UseFetch';
import { useEffect } from 'react';
import MainBk from './Components/Navbar';



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
  const{ userdata, BrowserInfo } = useFetch()
  
  
  useEffect(() => {
    BrowserInfo();
  },[])   
  
  return (
    <>
      <div className=' bg-gradient-to-b from-slate-50 to-purple-200 overflow-auto h-screen '>
        {userdata.auth ? <MainBk /> : <Forms />}
        <footer className="p-4 pb-0 text-center text-purple-700 pt-[170px]">
          <p>Devaxmed <span>®</span></p>
        </footer>
      </div>
    </>
  )
}

export default App
