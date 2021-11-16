import React from 'react'

import { useDispatch,useSelector } from 'react-redux'
import { obtenerDetallePokemon } from '../redux/pokeDucks'


const Detalle = () => {

     const dispatch = useDispatch()

     React.useEffect(()=>{
         const fetchData = ()=>{
             dispatch(obtenerDetallePokemon())
         }
         fetchData()
     },[dispatch])

     const pokemon = useSelector(store=> store.pokemones.unPokemon)

    return pokemon ? (
        <div className="card mt-4 text-center">
            <div className="card-body">
                <img src={pokemon.foto} alt="imagen" className="img-fluid"/>
                <div className="card-title text-uppercase">
                    {pokemon.name}
                </div>
                    <p className="card-text">
                        Alto:{pokemon.alto}  |  Ancho:{pokemon.ancho}
                    </p>
            </div>
        </div>
    ): null
}

export default Detalle
