import React from 'react'
import { auth,db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import'./styles/Login.css'

const Login = () => {
    const navigate=useNavigate()
    //hooks
    const [email,setEmail]=React.useState('')
    const [pass,setPass]=React.useState('')
    const [error,setError]=React.useState(null)
    const [modoRegistro,setModoRegistro]=React.useState(true)

    const guardarDatos=(e)=>{
        e.preventDefault()
        if (!email.trim()) {
            setError('Ingrese el email')
            return
        }
        if (!pass.trim()) {
            setError('Ingrese el Password')
            return
        }
        if (pass.length<6) {
            setError('Password debe ser mayor a 6 caracteres')
            return
        }
        setError(null)
        if (modoRegistro) {
            registrar()
        } else {
            login()
        }

    }
    const login=React.useCallback(async()=>{
        try {
            const res=await auth.signInWithEmailAndPassword(email,pass)
            console.log(res.user);
            setEmail('')
            setPass('')
            setError('')
            navigate('/admin')
        } catch (error) {
            console.log(error.code);
            if (error.code==='auth/wrong-password') {
                setError('Pass no coincide')
            }
            if (error.code==='auth/user-not-found') {
                setError('usuario no registrado')
            }
        }
    },[email,pass,navigate])
    const registrar=React.useCallback(async()=>{
        try {
            const res=await auth.createUserWithEmailAndPassword(email,pass)
            await db.collection('usuarios').doc(res.user.email).set(
                {
                    email:res.user.email,
                    id:res.user.uid
                }
            )
            console.log(res.user);
            setEmail('')
            setPass('')
            setError('')
            navigate('/admin')
        } catch (error) {
            console.log(error.code);
            if (error.code==='auth/invalid-email') {
                setError('Email inválido')
            }
            if (error.code==='auth/email-already-in-use') {
                setError('Email ya registrado')
            }
        }
    },[email,pass])
        

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-danger text-white text-center">
              <h5 className="card-title mb-0">Iniciar sesión</h5>
            </div>
            <div className="card-body">
            <form onSubmit={guardarDatos}>
                {
                    error && (
                        <div className='alert alert-danger'>
                            {error}
                        </div>
                    )
                }
                <input type="email" 
                className='form-control mb-2'
                placeholder='Ingrese su email'
                onChange={e=>setEmail(e.target.value.trim())}
                />
                <input type="password" 
                className='form-control mb-2'
                placeholder='Ingrese su Password'
                onChange={e=>setPass(e.target.value.trim())}
                />
                <div className='d-grid gap-2'>
                    <button className='btn btn-outline-danger'>
                        {
                            modoRegistro ? 'Registrarse' :'Acceder'
                        }
                    </button>
                    <button className='btn btn-outline-dark'
                    onClick={()=>{setModoRegistro(!modoRegistro)}}
                    type='button'
                    >
                        {
                            modoRegistro ? 'Ya estas registrado?': 'No tienes cuenta?'
                        }
                    </button>
                </div>
            </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      
  )
}

export default Login