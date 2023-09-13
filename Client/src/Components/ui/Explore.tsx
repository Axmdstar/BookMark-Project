import { useEffect } from "react";
import useFetch from "../Hooks/UseFetch";
import Bkcard from "./bkcard";
import Bkitems from "./bkitems";
import { LoadingOrbit } from './LoadingsAnime';

// Explore component is where all users bks are viewed 
// and can be selected.

const Explore = () => {
    const {bkarr,bkselected , currentid, ExplorePage, GetBkid, back, Loading} = useFetch();

    useEffect(() => {
        ExplorePage();
    }, []);
    
    return ( 
        <section className="">
            <h2 className="p-5 text-3xl font-semibold font-customtt text-orange-400">Explore</h2>
            {bkselected ?
                <Bkitems currentid={currentid} back={back} access={false}/> :
                <> {Loading ? <LoadingOrbit /> : <Bkcard bkarr={bkarr} GetBkid={GetBkid} />} </>
            }            
        </section>
     );
}
 
export default Explore;