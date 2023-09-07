import { useEffect } from "react";
import useFetch from "../Hooks/UseFetch";
import Bkcard from "./bkcard";
import Bookmarkitems from "./bkitems";
import { LoadingOrbit } from './LoadingsAnime';



const Explore = () => {
    const {bkarr,bkselected , currentid, ExplorePage, GetBkid, back, Loading} = useFetch();

    useEffect(() => {
        ExplorePage();
    }, []);
    
    return ( 
        <div className="h-screen">
            <h2 className="p-5 text-3xl font-semibold font-customtt text-orange-400">Explore</h2>
            {bkselected ? <Bookmarkitems currentid={currentid} back={back}/> : 
            <> { Loading ? <LoadingOrbit/> : <Bkcard bkarr={bkarr} GetBkid={GetBkid}/> } </> }            
        </div>
     );
}
 
export default Explore;