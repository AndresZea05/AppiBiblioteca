import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import './styles/Navbar.css'


const Navbar = (props) => {
    const navigate=useNavigate()
    const cerrarsesion=()=>{
        auth.signOut()
        .then(()=>{
            navigate('/login')
        })
    }
  return (
    

    <div className='navbar navbar-danger bg-danger' id="Nava">
        <Link className='navbar-brand' to="/"><img src="./public/cucLogo.png" width="40" height="40" ></img></Link>
      
        <div className='d-flex'>
            <Link className='btn btn-danger' to="/">Inicio</Link>
            
            {
                props.firebaseUser !==null ?
                (<Link className='btn btn-danger' to="/admin">Admin</Link>):
                null
            }
            {
                props.firebaseUser !==null ?(
                    <button className='btn btn-danger'
                    onClick={cerrarsesion}
                    >Cerrar Sesión</button>
                ):(
                    <Link className='btn btn-danger' to="/login">Login</Link>
                )
            }
        </div>
      
    </div>
  )
}

export default Navbar