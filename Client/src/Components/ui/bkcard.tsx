import {AiFillHeart} from 'react-icons/ai';
import useFetch from '../Hooks/UseFetch';

// Bkcard is the card that show like, title, username
// the props it takes are bkarr Bookmark array and Getbkid function
// GetBkid() Gets the bookmark id 

interface bkarrobj {
    bookmarkid : string,
    title : string,
    likes:number,
    name?:string
}

interface BkmkProps {
    bkarr?:bkarrobj[],
    GetBkid: (e:React.MouseEvent) => void,
    setbkselected?:React.Dispatch<React.SetStateAction<boolean>>
}


const Bkcard = ({ bkarr, GetBkid } :BkmkProps ) => {
    const {liked} = useFetch();

    return(
        <div className="md:grid grid-cols-4 gap-3 ">

        {
        bkarr?.map((bk:bkarrobj ) =>
        {
            return(
                <div className="py-2">
                    <div key={bk.bookmarkid} className="p-5 flex w-full duration-75 rounded-md shadow-md shadow-violet-400 bg-gradient-to-l from-10% to-violet-50 from-violet-100 hover:to-orange-50 hover:from-orange-100 hover:shadow-orange-400">
                        <button id={bk.bookmarkid} onClick={GetBkid} className='w-full' >
                            <div className='text-left'>
                                <h4 className="text-2xl text-violet-400 hover:text-orange-400 font-semibold ">{bk.title}</h4>
                                <p className='pt-2 text-violet-400'>{bk.name}</p>
                            </div>
                        </button>

                            <div className="self-end ml-auto flex gap-1 items-center hover:text-violet-700" id={bk.bookmarkid} onClick={()=>{liked(bk.bookmarkid)}}>
                                <AiFillHeart className="text-violet-400 drop-shadow-md duration-75 hover:scale-150 hover:text-OvsP-o500 hover:drop-shadow-lg" />
                                <p className='text-violet-400'>{bk.likes}</p>
                            </div>

                    </div>
                </div>
            )
        }) ??   <div className='text-center w-full p-6 '>
                    <p className='font-semibold text-1xl'> Create a Bookmark</p>
                </div>
        }

        </div>
    )   
}

export default Bkcard;