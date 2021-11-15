import axios from "axios"


//constantes
const dataInicial = {
    array : []
}
//Types
const OBTENER_POKEMONES_EXITO = "OBTENER_POKEMONES_EXITO"


//reducer
export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {
                ...state , array: action.payload
            }
            default:
                return state
    }
}

//acciones

export const obtenerPokemonesAccion = () => async (dispatch,getState) =>{
    try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data.results
        })
    } catch (error) {
        console.log(error)
    }
}
//en la primera funcion recibimos los parametros
//en la segunda funcion necesita dispatch y getState , con dispatch activamos el reducir  y con el getState recibimos la data inicial