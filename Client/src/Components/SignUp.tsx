import {useForm, SubmitHandler} from 'react-hook-form';
import { SignUptype } from './ui/formtype';
import { useState } from 'react';
import Label from "./ui/label";
import axios from 'axios';



const Redirect = (() => {
    return(
        <div>
            <p>Account Was Created Successfully</p>
        </div>
    )
})

export const SignUp = ({setSigning}:{setSigning: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [password, setPassword] = useState("");
    const [signupRes, setSignupRes] = useState();
    // const {setUserdata} = useContext(Usrcontext);


    const {
        register,
        handleSubmit,
        
    } = useForm<SignUptype>();

    const SendData: SubmitHandler<SignUptype> = (data) => {
        console.log(data);    

        axios.post("/signup", data)
            .then((res)=>{
                console.log("Data from server >> ",res);
                setSignupRes(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    

  const buttonstyle = "mb-2 block w-full rounded bg-purple-600 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-purple-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-purple-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-purple-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

    return ( 
        <form onSubmit={handleSubmit(SendData)} className="flex flex-col gap-5  w-[300px]">
            {signupRes ? <Redirect/> : 
            <div>
            {/* <h3>Sign Up</h3> */}
            <Label>Username</Label>
            <input {...register("username", {required:'Please Enter your UserName'})}
                className={" block min-h-[auto] w-full focus:ring-2 ring-purple-600 rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-purple-300 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black placeholder:text-purple-400 peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "}
                />

            <Label>Email</Label>
            <input {...register("email",{required:'Please Enter your Email'})} 
            className={" block min-h-[auto] w-full focus:ring-2 ring-purple-600 rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-purple-300 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black placeholder:text-purple-400 peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "}
                />

            <Label>Password</Label>
            <input onChange={(e) => { setPassword(e.target.value) }} 
                className={" block min-h-[auto] w-full focus:ring-2 ring-purple-600 rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-purple-300 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black placeholder:text-purple-400 peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "}
                />
            <Label>Confirm Password</Label>
            <input {...register("password",
            {onChange: (e) => e.target.value == password ? console.log("Match") : null,
            minLength:{value:6,message:"minlength 6"}})} 
            className={" block min-h-[auto] w-full focus:ring-2 ring-purple-600 rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-purple-300 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black placeholder:text-purple-400 peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "}
            />

            <p className='py-4'>already have an Account <span onClick={()=>setSigning(false)} className='font-bold text-purple-700 cursor-pointer' >Login</span></p>
            <input type="submit" className={buttonstyle}  />
            </div>
            }

        </form>
     );
}
 
