import { createContext  ,useState} from "react";
// empty context
export const btnContext = createContext()

export function BtnContextProvider({children})
{
    const [empty,setEmpty]=useState(true)
    return (<btnContext.Provider value={{empty,setEmpty}}>
        {children}
    </btnContext.Provider>)
}

// show modal context
export const showContext = createContext()

export function ShowModalProvider({children})
{
    const [show,showSet]=useState(false)
    return (<showContext.Provider value={{show,showSet}}>
        {children}
    </showContext.Provider>)
}
