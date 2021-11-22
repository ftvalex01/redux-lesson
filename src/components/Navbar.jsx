import React from 'react'
import {Link,NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">APP POKE</Link>
            <div className="d-flex">
                <NavLink className="btn btn-dark mr-2" to="/" exact>Inicio</NavLink>
                <NavLink className="btn btn-dark mr-2" to="/login" exact>login</NavLink>
                <button className="btn btn-dark mr-2">cerrar sesion</button>
            </div>
        </div>
    )
}

export default Navbar
