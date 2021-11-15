import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { obtenerPokemonesAccion,obtenerSiguientePagina } from '../redux/pokeDucks'


const Pokemones = () => {

    const dispatch = useDispatch()
    const pokemones = useSelector(store => store.pokemones.results)
   

    return (
        <div>
            <h1>lista de pokemones</h1>
            <button onClick={()=>dispatch(obtenerPokemonesAccion())}>Get pokemones</button>
            <button onClick={()=>dispatch(obtenerSiguientePagina(20))}>siguiente</button>
            <ul>
                {
                    pokemones.map(item=>(
                        <li key={item.name}>{item.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pokemones
