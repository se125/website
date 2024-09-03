import { useState } from "react";
import { createContext } from "react";

export let UserContext=createContext()
export function UserContextProvider(props) {
    const [UserLogin, setUserLogin] = useState(localStorage.getItem("usertoken")?localStorage.getItem("usertoken"):null)

    return(
        <UserContext.Provider value={{UserLogin,setUserLogin}}>

            {props.children}
        </UserContext.Provider>
    )
    
}