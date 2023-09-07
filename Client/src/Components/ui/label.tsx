


const Label = ({ children }:React.PropsWithChildren) => {
  return ( 
    <label className={"text-[18px] leading-[35px] text-violet-600 font-mono font-extrabold"}>
      {children}
    </label>
   );
}
 
export default Label;