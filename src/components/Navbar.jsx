import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { cerrarSesion } from '../redux/usuarioDucks'
import { withRouter } from 'react-router-dom'



const Navbar = (props) => {

    const dispatch = useDispatch()
    
    const cerrarSesionActiva = () =>{
        dispatch(cerrarSesion())
        props.history.push("/login")
    }

    const activo = useSelector(store=>store.usuario.activo)


    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">APP POKE</Link>
            <div className="d-flex">
            {
                activo ?(
                    <>
                    <NavLink className="btn btn-dark mx-2" to="/" exact>Inicio</NavLink>
                    <button className="btn btn-dark mx-2" onClick={()=>(cerrarSesionActiva())}>cerrar sesion</button>
                    </>
                ) : (
                    <NavLink className="btn btn-dark mx-2" to="/login" exact>login</NavLink>
                )
            }
      
            </div>
        </div>
    )
}

export default withRouter(Navbar)
