import {IoChevronBackOutline} from 'react-icons/io5';



const BackBtn = ({back}:{back:()=>void}) => {
    

    
    return ( 
        <button onClick={back}>
            <IoChevronBackOutline color="purple" font-size="40px"/>
        </button>
     );
}
 
export default BackBtn;