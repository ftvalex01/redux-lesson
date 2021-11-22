import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { cerrarSesion } from '../redux/usuarioDucks'
import { withRouter } from 'react-router'



const Navbar = (props) => {

    const dispatch = useDispatch()
    
    const cerrarSesionActiva = () =>{
        dispatch(cerrarSesion())
        props.history.push("/login")
    }


    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">APP POKE</Link>
            <div className="d-flex">
                <NavLink className="btn btn-dark mr-2" to="/" exact>Inicio</NavLink>
                <NavLink className="btn btn-dark mr-2" to="/login" exact>login</NavLink>
                <button className="btn btn-dark mr-2" onClick={()=>(cerrarSesionActiva())}>cerrar sesion</button>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
