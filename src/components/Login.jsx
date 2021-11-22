import React from 'react'
import { useDispatch } from 'react-redux'
import { ingresoUsuario } from '../redux/usuarioDucks'

const Login = () => {

     const dispatch = useDispatch()

    return (
        <div className="mt-5 text-center">
            <h3>Ingreso con Google</h3>
            <hr/>
            <button className="btn btn-dark" onClick={()=>dispatch(ingresoUsuario())}>acceder</button>
        </div>
    )
}

export default Login
