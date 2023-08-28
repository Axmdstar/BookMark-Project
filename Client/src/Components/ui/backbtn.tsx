import {IoChevronBackOutline} from 'react-icons/io5';



const BackBtn = ({back}:{back:()=>void}) => {
    

    
    return ( 
        <button onClick={back} className='hover:animate-pulse'>
            <IoChevronBackOutline className="text-OvsP-p300" font-size="40px"/>
        </button>
     );
}
 
export default BackBtn;