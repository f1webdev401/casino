import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css"
function App() {
  return (
    <main className="main-app">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </main>
  );
}

export default App;
