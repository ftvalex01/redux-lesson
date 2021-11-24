import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { actualizarUsuarioAccion, editarFotoAccion } from '../redux/usuarioDucks'

const PerfilUser = () => {

    const loading = useSelector(store=>store.usuario.loading)
    const usuario = useSelector(store => store.usuario.user)
    const [nombreUsuario , setNombreUsuario] = React.useState(usuario.displayName)
    const [activarFormulario,setActivarFormulario] = React.useState(false)

    const dispatch = useDispatch()

    const actualizarUsuario = () =>{

        if(!nombreUsuario.trim()){
            console.log('Nombre Vacio')
            return
        }
        dispatch(actualizarUsuarioAccion(nombreUsuario))
        setActivarFormulario(false)
    }


    const [error,setError] = React.useState(false)

    const seleccionarArchivo = imagen =>{
      const imagenCliente = imagen.target.files[0]
      if(imagenCliente === undefined){
        console.log('no se selecciono una imagen')
        return
      }
      if(imagenCliente.type === "image/png" || imagenCliente === "image/jpg"){
        dispatch(editarFotoAccion(imagenCliente))
        setError(false)
      }else{
          setError(true)
        
      }
    }

    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} width="100px" className="img-fluid" alt="" />
                    <h5 className="card-title">Nombre:{usuario.displayName}</h5>
                    <p className="card-text">Email:{usuario.email}</p>
                    <button className="btn btn-dark" onClick={()=>setActivarFormulario(true)}>Editar nombre</button>
                </div>
                {
                    error &&
                    <div className="alert alert-warning">
                        solo archivos .jpg o .png
                    </div>
                }

                <div className="mb-3">
                    <label for="formFile" className={loading ? 'btn btn-dark mt-2 disabled' : 'btn btn-dark'}>Actualizar Imagen</label>
                    <input className="form-control" type="file" id="formFile" style={{display:'none'}}
                        onChange={e => seleccionarArchivo(e)} disabled={loading}
                    />
                </div>

                    {
                    loading && 
                    <div className="card-body">
                        <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        </div>
                    </div>
                }
                {
                    activarFormulario && 

                    <div className="card-body">
                    <div className="row justify-content-center">
                        <div className="col-md-5">

                            <div className="input-group mb-3">

                            <input type="text" 
                            className="form-control"
                            value={nombreUsuario}
                            onChange={e => setNombreUsuario(e.target.value)} 
                            />

                            <button className="btn btn-dark" 
                            type="button"
                            onClick={()=>actualizarUsuario()}>
                            Actualizar
                            </button>

                            </div>

                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default PerfilUser
