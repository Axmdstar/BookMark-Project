import {useForm, SubmitHandler} from 'react-hook-form';
import { SignUptype } from './ui/formtype';
import { useState } from 'react';
import Label from "./ui/label";
import axios from 'axios';
import {LoadingIcon} from './ui/LoadingsAnime';


const Redirect = (({setSigning}:{setSigning: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const buttonstyle = "mb-2 block w-full rounded bg-purple-600 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-purple-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-purple-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-purple-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
    return(
        <div className='text-center'>
            <p className='text-yellow-700'>Account Was Created Successfully</p>
            <button className={buttonstyle} onClick={()=> setSigning(false)}>Login</button>
        </div>
    )
})

export const SignUp = ({setSigning}:{setSigning: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [password, setPassword] = useState("");
    const [signupRes, setSignupRes] = useState();
    const [Loading, setLoading] = useState(false);



    const {
        register,
        handleSubmit,
    } = useForm<SignUptype>();

    const SendData: SubmitHandler<SignUptype> = (data) => {
        console.log(data);    
        setLoading(true);
        axios.post("/signup", data)
            .then((res)=>{
                console.log("Data from server >> ",res);
                setLoading(false);
                setSignupRes(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    

  const buttonstyle = "mb-2 block w-full rounded bg-violet-500 px-6 pb-2 pt-2.5 text-xl font-medium uppercase hover:bg-OvsP-p400 leading-normal text-white shadow-violet-800 shadow-lg transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-OvsP-p200 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-OvsP-p500 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "

    return ( 
        <form onSubmit={handleSubmit(SendData)} className="flex flex-col gap-5  w-[300px]">
            {signupRes ? <Redirect setSigning={setSigning} /> :
                <div>

                    <Label>Username:</Label>
                    <input {...register("username", { required: 'Please Enter your UserName' })}
                        className={" block min-h-[auto] w-full focus:ring-2 ring-purple-600 rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-purple-300 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black placeholder:text-purple-400 peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "}
                    />

                    <Label>Email:</Label>
                    <input {...register("email", { required: 'Please Enter your Email' })}
                        className={" block min-h-[auto] w-full focus:ring-2 ring-purple-600 rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-purple-300 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black placeholder:text-purple-400 peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "}
                    />

                    <Label>Password:</Label>
                    <input onChange={(e) => { setPassword(e.target.value) }}
                        className={" block min-h-[auto] w-full focus:ring-2 ring-purple-600 rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-purple-300 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black placeholder:text-purple-400 peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "}
                    />
                    <Label>Confirm Password:</Label>
                    <input {...register("password",
                        {
                            onChange: (e) => e.target.value == password ? console.log("Match") : null,
                            minLength: { value: 6, message: "minlength 6" }
                        })}
                        className={" block min-h-[auto] w-full focus:ring-2 ring-purple-600 rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-purple-300 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black placeholder:text-purple-400 peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "}
                    />

                    <p className='py-6 text-violet-600'>already have an Account <span onClick={() => setSigning(false)} className='text-orange-400 cursor-pointer hover:text-orange-800' >Login</span></p>
                    {/* <input type="submit" className={buttonstyle}/> */}

                    <button type="submit"
                        className={buttonstyle}
                    > {Loading ? <LoadingIcon /> : "Submit"}
                    </button>

                </div>

            }

        </form>
     );
}
 
