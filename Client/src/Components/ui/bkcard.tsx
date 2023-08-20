import {AiFillHeart} from 'react-icons/ai';


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

    
    return(
        <div className="md:grid grid-cols-4 gap-3 ">

        {
        bkarr?.map((bk:bkarrobj ) =>
        {
            return(
                <div className="py-2">
                    <div >
                        <button id={bk.bookmarkid} onClick={GetBkid} className="p-5 flex w-full rounded-md bg-gradient-to-b from-slate-50 to-yellow-50 drop-shadow-lg" key={bk.bookmarkid} >
                            <div className='text-left'>
                                <h4 className="text-2xl text-orange-950 font-semibold ">{bk.title}</h4>
                                <p className='pt-2'>{bk.name}</p>
                            </div>
                            
                            <div className="self-end ml-auto flex gap-1 items-center">
                                <AiFillHeart color="#5a189a" />
                                <p >{bk.likes}</p>
                            </div>

                        </button>
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