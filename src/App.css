import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Inicio from "./components/Inicio"
import Login from "./components/Login"
import Admin from "./components/Admin"
import Navbar from "./components/Navbar";
import React from "react";
import { auth } from "./firebase";

function App() {
  const [firebaseUser,setFirebaseUser]=React.useState(false)
  React.useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      console.log(user)
      if (user) {
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })
  },[])
  return firebaseUser!==false?(
    <Router>
      <Navbar firebaseUser={firebaseUser}/>
    <div className="container">
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="admin" element={<Admin/>}/>
      </Routes>
    </div>
    </Router>
  ):(<p>Cargando...</p>)
  ;
}

export default App;
