import { createContext , useState } from "react";

const UserContext = createContext<any>(null)

export const UserContextProvider = ({children}:{children:React.ReactNode}) => {
    const [userD,setUserD] = useState<any>(null)

    return <UserContext.Provider value={{userD,setUserD}}>{children}</UserContext.Provider>
}

export default UserContext