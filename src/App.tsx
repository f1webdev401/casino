import { Outlet } from "react-router-dom";
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
function App() {

  const [user,setUser] = useState<any>(null)
  const {userD,setUserD} = useContext(UserContext)
  useEffect(() => {
    onAuthStateChanged(auth,(currentUser) => {
      setUser(currentUser)
      if(!currentUser) {
          setUserD(null)
          return;
      }
      const userRef = ref(db,`users/${currentUser?.uid}`)
      onValue(userRef,(snapshot) => {
        const data = snapshot.val()
        setUserD({...data,...currentUser})
      })
    })
  },[])
  return (
    <main className="main-app">
      <Navbar user={{user,userD}}/>
      <Outlet/>
      <Footer/>
    </main>
  );
}

export default App;
