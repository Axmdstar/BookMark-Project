import React, { useState } from 'react';
import { createContext } from "react";

// global state 
export type UsrContexttype = {
    name: string,
    idUser: string,
    auth: boolean
}

type authcontext = {
    userdata: UsrContexttype,
    setUserdata : (usrstate:UsrContexttype) => void 
}






export const Usrcontext = createContext<authcontext>({} as authcontext)

export const UsrContext = ({children}: React.PropsWithChildren<{}>) => {
    
    const defaultcontext:UsrContexttype = {name:"", idUser:"", auth:false} 
    const [userdata, setUserdata] = useState(defaultcontext);

    const contextvalue:authcontext = {userdata, setUserdata}

    return ( 
        <Usrcontext.Provider value={contextvalue}>
            {children}
        </Usrcontext.Provider>
     );
}
 
