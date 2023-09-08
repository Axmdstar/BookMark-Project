import {useForm, SubmitHandler} from 'react-hook-form';
import { useContext, useState } from 'react'
import axios from 'axios';
import Label from "./ui/label";
import { Logintype } from './ui/formtype';
import { Usrcontext } from './context';
import {LoadingIcon} from './ui/LoadingsAnime';



const Login = ({setSigning}:{setSigning: React.Dispatch<React.SetStateAction<boolean>>}) => {
  
  const {setUserdata} = useContext(Usrcontext);
  const [Loading, setLoading] = useState(false);
  const [serverErr, setserverErr] = useState();
  
  //* Custom Hook From react-hook-forms 
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<Logintype>({defaultValues:{usrname:"", password:""}});

  
  const SubmitHandle: SubmitHandler<Logintype> = (data) => {

      setLoading(true);
      axios.post("/login", data)
      .then((res) => {
        
        const {idUser, name} = res.data;
        setLoading(false);
        setUserdata({idUser, name, auth:true});
      })
      .catch((err) => {
        setserverErr(err.response.data);
      })
  }
  
  const buttonstyle = "mb-2 block w-full rounded bg-violet-500 px-6 pb-2 pt-2.5 text-xl font-medium uppercase hover:bg-OvsP-p400 leading-normal text-white shadow-violet-800 shadow-lg transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-OvsP-p200 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-OvsP-p500 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
  
  return (
    <form onSubmit={handleSubmit(SubmitHandle)} onError={() => console.log("Error in submit")} className="flex flex-col gap-5  w-[300px] ">

      <div>
        <Label>Username:</Label>
        <input {...register("usrname", { required: 'Please Enter your UserName' })}
          className={"shadow-sm block min-h-[auto] w-full focus:ring-2 ring-OvsP-p500 rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-OvsP-p200 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black "} />
          {errors.usrname && <p className='text-xs text-red-500'>{errors.usrname.message}</p>}
      </div>

      <div>
        <Label>Password:</Label>
        <input {...register("password", { required: true, minLength: { value: 6, message: "minlength 6" } })}
          type='password'
          className={"shadow-sm focus:ring-2 ring-OvsP-p500 block min-h-[auto] w-full rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100   motion-reduce:transition-none  "}
        ></input>
        {errors.password && <p className='text-xs text-red-500'>{errors.password.message}</p>}
        {serverErr && <p className='text-xs text-red-500 py-2'>{serverErr}</p>}
      </div>

      <div className='text-center'>
        <p className='py-4 text-violet-600'>don't have Account <span onClick={() => setSigning(true)} className='text-orange-400 cursor-pointer hover:text-orange-800' >Create one</span></p>

        <button type="submit" 
          className={buttonstyle}
        > {Loading ? <LoadingIcon /> : "Login"} 
        </button>

      </div>

    </form>
  );
}

export default Login;