import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css"
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase-config";
import { useContext } from "react";
import UserContext from "./context/UserContext";
import { useCookies } from "react-cookie";
import axios from "axios";

function App() {
  const navigate = useNavigate()
  const [cookies,_,removeCookie] = useCookies<any>([])
  const [username,setUsername] = useState<any>("")
  // const {userD,setUserD} = useContext(UserContext)

  useEffect(() => {
      const verifyCookie  = async () => {
        if(!cookies.token) {
          navigate('/login')
        }
        const {data} : any = await axios.post('https://smmserver.onrender.com/api/users',{},
          {withCredentials:true}
        )
        .catch(e => {
          console.log('error')
            console.log(e)
            return
        })
        const {status,user} = data
        setUsername(user)
        return status ? (console.log("user logged in")) :
        (removeCookie('token'),navigate('/login'))
      }
      verifyCookie()
  },[cookies,navigate,removeCookie])

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  // useEffect(() => {
   
  //   onAuthStateChanged(auth,(currentUser) => {
  //     setUser(currentUser)
  //     if(!currentUser) {
  //         setUserD(null)
  //         return;
  //     }
  //     const userRef = ref(db,`users/${currentUser?.uid}`)
  //     onValue(userRef,(snapshot) => {
  //       const data = snapshot.val()
  //       setUserD({...data,...currentUser})
  //     })
  //   })
   
  // },[])
  // 
 
  return (
    <main className="main-app">
      {/* <Navbar user={{user,userD}}/> */}
      <Navbar/>
      <Outlet/>
      <Footer/>
    </main>
  );
}

export default App;
