import { createContext , useState } from "react";


const SignupContext = createContext<any|null>(null)


export const SignupProvider = ({children}:{children:React.ReactNode}) => {
    const [signupMessage,setSignupMessage] = useState<any | null>("")
    return <SignupContext.Provider value={{signupMessage,setSignupMessage}}>{children}</SignupContext.Provider>
}

export default SignupContext