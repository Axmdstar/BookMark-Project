import {useForm, SubmitHandler} from 'react-hook-form';
import { useContext, useState } from 'react'
import axios from 'axios';
import Label from "./ui/label";
import { Logintype } from './ui/formtype';
import { Usrcontext } from './context';

// const inputstyle = "peer block min-h-[auto] w-full rounded border-0 bg-yellow-400 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-purple-400 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"

const Login = ({setSigning}:{setSigning: React.Dispatch<React.SetStateAction<boolean>>}) => {
  
  const [ cansubmit ] = useState(false);
  const {setUserdata} = useContext(Usrcontext);
  const [serverErr, setserverErr] = useState();
  

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<Logintype>({defaultValues:{usrname:"", password:""}});

  
  const SubmitHandle: SubmitHandler<Logintype> = (data) => {

      console.log("data >>>> ",data);

      axios.post("/login", data)
      .then((res) => {
        
        const {idUser, name} = res.data
        setUserdata({idUser, name, auth:true})
      })
      .catch((err) => {
        console.log(err);
        setserverErr(err.response.data);
      })

  }
  
  const buttonstyle = "mb-2 block w-full rounded bg-OvsP-p500 px-6 pb-2 pt-2.5 text-xl font-medium uppercase hover:bg-OvsP-p400 leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-OvsP-p300 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-OvsP-p500 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
  
  return ( 
    <form onSubmit={handleSubmit(SubmitHandle)} onError={()=>console.log("Error in submit")} className="flex flex-col gap-5  w-[300px] ">

      <div>
      <Label  >Username:</Label>
      <input {...register("usrname", { required:'Please Enter your UserName'})}
              placeholder='Username' 
             className={" block min-h-[auto] w-full focus:ring-2 ring-OvsP-p500 rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-OvsP-p200 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black placeholder:text-OvsP-p300 "}/>
      {errors.usrname && <p className='text-xs text-red-500'>{errors.usrname.message}</p>}
      </div>

      <div>
      <Label>Password:</Label>
      <input {...register("password", {required:true,  minLength:{value:6,message:"minlength 6"}})} 
      type='password'
        className={"focus:ring-2 ring-OvsP-p500 block min-h-[auto] w-full rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100   motion-reduce:transition-none  "}
      ></input>
      {errors.password && <p className='text-xs text-red-500'>{errors.password.message}</p>}

      {serverErr && <p className='text-xs text-red-500 py-2'>{serverErr}</p>}
      </div>

      <div>
      <p className='py-4'>don't have Account <span onClick={()=>setSigning(true)} className='font-bold text-purple-700 cursor-pointer' >Create one</span></p>

      <button type="submit" disabled={cansubmit} 
       className={buttonstyle} 
       >Login</button>
       </div>

    </form> 
   );
}
 
export default Login;