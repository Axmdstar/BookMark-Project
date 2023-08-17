


const Label = ({ children }:React.PropsWithChildren) => {
  return ( 
    <label className={"text-[18px] leading-[35px] text-purple-800 font-mono font-extrabold"}>
      {children}
    </label>
   );
}
 
export default Label;