import React from 'react'
import { db } from '../firebase'

const Registro = (props) => {
    //hooks
  const [lista,setLista]=React.useState([])
  const [nombre,setNombre]=React.useState('')
  
  const [id,setId]=React.useState('')
  const [modoedicion,setModoEdicion]=React.useState(false)
  const [error,setError]=React.useState(null)
  //leer datos
  React.useEffect(()=>{
    const obtenerDatos=async()=>{
      try {
        //const db=firebase.firestore()
        const data=await db.collection(props.user.email).get()
        //console.log(data.docs);
        const arrayData=data.docs.map(doc=>({id:doc.id,...doc.data()}))
        setLista(arrayData)
      } catch (error) {
        console.error(error);
      }
    }
    obtenerDatos()
  },[])
  //guardar
  const guardarDatos=async(e)=>{
    e.preventDefault()
    if (!nombre) {
      setError("Ingrese el Nombre del libro")
      return
    }

    //registrar en firebase
    try {
        //const db=firebase.firestore()
        const nuevoUsuario={nombre}
        const dato=await db.collection(props.user.email).add(nuevoUsuario)
        setLista([
          ...lista,
          {...nuevoUsuario,id:dato.id}
        ])
        setNombre('')
        
        setError(null)
    } catch (error) {
      console.error(error);
    }
  }
  //eliminar
  
  const eliminarDato=async(id)=>{
    if (modoedicion) {
      setError('No puede eliminar mientras edita el nombre del libro.') 
      return
     }
    try {
        //const db=firebase.firestore()
        await db.collection(props.user.email).doc(id).delete()
        const listaFiltrada=lista.filter(elemento=>elemento.id!==id)
        setLista(listaFiltrada)
    } catch (error) {
      console.error(error);
    }
  }
  //editar
  const editar=(elemento)=>{
    setModoEdicion(true)//activamos el modo edición
    setNombre(elemento.nombre)
    
    setId(elemento.id)
  }
//editar datos
const editarDatos=async(e)=>{
  e.preventDefault()
    if (!nombre) {
      setError("Ingrese el Nombre del libro")
      return
    }
    
    try {
        //const db=firebase.firestore()
        await db.collection(props.user.email).doc(id).update({
          nombre
        })
        const listaEditada=lista.map(elemento=>elemento.id===id ? {id,nombre} : 
          elemento
          )
          setLista(listaEditada)//listamos nuevos valores
          setModoEdicion(false)
          setNombre('')
        
          setId('')
          setError(null)
    } catch (error) {
      console.error(error);
    }
}
  return (
    <div className='container'>
      {
        modoedicion ? <h2 className='text-center text-success'>Edicion de libros</h2> :
        <h2 className='text-center text-primary'>Regristro de pedidos</h2>
      }
      
      <form onSubmit={modoedicion ? editarDatos : guardarDatos}>
        {
          error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ):
          null
        }
      

        <input type="textarea" 
        placeholder='Ingrese el Nombre del libro'
        className='form-control mb-2'
        onChange={(e)=>{setNombre(e.target.value.trim())}}
        value={nombre}
        />
        
        <div className='d-grid gap-2'>
          {
            modoedicion ? <button type='submit' className='btn btn-outline-success'>Editar</button> :
            <button type='submit' className='btn btn-outline-info'>Solicitar</button>
          }
          
        </div>
      </form>
      <h2 className='text-center text-primary'>Listado de solucitudes</h2>
      <ul className='list-group'>
        {
          lista.map(
            (elemento)=>(
              <li className='list-group-item bg-info' key={elemento.id}>
                {elemento.nombre} 
                <button 
                onClick={()=>eliminarDato(elemento.id)}
                className='btn btn-danger float-end me-2'>Eliminar</button>
                <button 
                onClick={()=>editar(elemento)}
                className='btn btn-warning float-end me-2'>Editar</button>
                </li>
            )
          )
        }
      </ul>
    </div>
  )
}

export default Registro