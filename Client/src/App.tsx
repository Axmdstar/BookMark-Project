import './App.css'
import { Forms } from './Components/Forms'
import useFetch from './Components/Hooks/UseFetch';
import { useEffect } from 'react';
import MainBk from './Components/Navbar';



//* to-dos
//* Show Errors in Ui
//* signup
//* check password and username is empty
//* home page
//* Loading state or page of skelaten 
// ! add isloading state in the useFetch()
//* ##user homepage when logged-in
//* ##user home
//  ##add text,link,image comp
//  ##bk like
//* explore other users
//  select like and expect



function App() {
  // Custom Hook
  const{ userdata, BrowserInfo } = useFetch()
  
  
  useEffect(() => {
    BrowserInfo();
  },[])   
  
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Lily+Script+One&display=swap" rel="stylesheet"></link>
      {userdata.auth ? <MainBk/> : <Forms/> }
    </>
  )
}

export default App
