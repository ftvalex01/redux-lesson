import {auth,firebase,db,storage} from '../firebase'


//data inicial
const dataInicial={
    loading:false,
    activo:false
}



//types
const LOADING = "LOADING"
const USUARIO_ERROR = "USUARIO_ERROR"
const USUARIO_EXITO = "USUARIO_EXITO"
const CERRAR_SESION = "CERRAR_SESION"

//reducer
export default function usuarioReducer(state = dataInicial,action){
    switch (action.type) {
        case LOADING:
            return{...state,loading:true}
        case USUARIO_ERROR:
            return{...dataInicial}
        case USUARIO_EXITO:
            return{...state, loading:false, activo:true , user:action.payload}
        case CERRAR_SESION:
            return{...dataInicial}
        default:
            return{...state}
    }
}




//action

export const ingresoUsuario = () => async(dispatch) =>{
    dispatch({
        type:LOADING
    })
    try {

        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)

        const usuario = {
            uid:res.user.uid,
            email:res.user.email,
            displayName:res.user.displayName,
            photoURL:res.user.photoURL
        }

        const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()
            if(usuarioDB.exists){
                dispatch({
                    type:USUARIO_EXITO,
                    payload: usuarioDB.data()
                })
                localStorage.setItem('usuario',JSON.stringify(usuario))
            }else{
                db.collection('usuarios').doc(usuario.email).set(usuario)
                dispatch({
                    type:USUARIO_EXITO,
                    payload: usuario
                })
                localStorage.setItem('usuario',JSON.stringify(usuario))
            }
            

    
        

    } catch (error) {
        console.log(error)
        dispatch({
            type: USUARIO_ERROR
            
        })
    }
}

export const leerUserActive = () => (dispatch) =>{
    if(localStorage.getItem('usuario')){
        dispatch({
            type:USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }
}

export const cerrarSesion = () =>(dispatch)=>{
    auth.signOut()
    localStorage.removeItem('usuario')
    dispatch({
        type: CERRAR_SESION
    })
}

export const actualizarUsuarioAccion = (nombreActualizado) => async(dispatch,getState)=>{
    dispatch({
        type: LOADING
    })

    const {user} = getState().usuario

    try {
        await db.collection('usuarios').doc(user.email).update({
            displayName: nombreActualizado
        })
        const usuario = {
            ...user,
            displayName: nombreActualizado
        }
        dispatch({
            type: USUARIO_EXITO,
            payload:usuario
        })
        localStorage.setItem('usuario',JSON.stringify(usuario))
    } catch (error) {
        console.log(error)
    }
}

export const editarFotoAccion = (imagenEditada)=> async(dispatch,getState)=>{
    dispatch({
        type:LOADING
    })
    const {user} = getState().usuario
    try {
        const imagenRef = await storage.ref().child(user.email).child('foto perfil')
        await imagenRef.put(imagenEditada)
        const imagenURL = await imagenRef.getDownloadURL()
        await db.collection('usuarios').doc(user.email).update({
            photoURL: imagenURL
        })
        const usuario = {
            ...user,
            photoURL: imagenURL
        }
        dispatch({
            type:USUARIO_EXITO,
            payload: usuario
        })
        localStorage.setItem('usuario',JSON.stringify(usuario))
    } catch (error) {
        console.log(error)
    }
} 