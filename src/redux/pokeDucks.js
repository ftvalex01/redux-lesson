import axios from "axios"


//constantes
const dataInicial = {
    count:0,
    next:null,
    previous:null,
    results:[]
   
   
    /*  array : [],
    offset: 0 */
}
//Types
const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO"
const SIGUIENTE_POKEMONES_EXITO = "SIGUIENTE_POKEMONES_EXITO"
const ANTERIOR_POKEMONES_EXITO = "ANTERIOR_POKEMONES_EXITO"

//reducer
export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {
                ...state , ...action.payload
            }
        case SIGUIENTE_POKEMONES_EXITO:
            return{
                ...state,...action.payload
            }
        case ANTERIOR_POKEMONES_EXITO:
            return{
                ...state,...action.payload
            }
            default:
                return state
    }
}

//acciones

export const obtenerPokemonesAccion = () => async (dispatch,getState) =>{

   //const offset =  getState().pokemones.offset


    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const obtenerSiguientePagina = () => async(dispatch,getState) =>{

    const next = getState().pokemones.next


   /*  const offset =  getState().pokemones.offset
    const siguiente = offset + numero */


    try {
        const res = await axios.get(next)
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}


export const obtenerAnteriorPagina = () =>async(dispatch,getState) =>{
    const previous = getState().pokemones.previous

    try {
        const res = await axios.get(previous)
        dispatch({
            type: ANTERIOR_POKEMONES_EXITO,
            payload:res.data
        })
    } catch (error) {
        console.log(error)
    }
}



//en la primera funcion recibimos los parametros
//en la segunda funcion necesita dispatch y getState , con dispatch activamos el reducir  y con el getState recibimos la data inicial