import { FC } from "react"
import { Grid } from "@nextui-org/react"
import { FavoriteCardPokemons } from "./FavoriteCardPokemons"

interface Props {
    pokemons: number[]
}

export const FavoritePokemons: FC<Props> = ({ pokemons }) => {
  return (
    // Estilo de tarjetas
    <Grid.Container gap={ 2 } direction='row' justify='flex-start'>
        {
          // Mapeo de arreglo que contiene favoritos
          pokemons.map( id => (
            // Se recibe componente y con el argumentos creados en este archivo
            <FavoriteCardPokemons key={ id } pokemonId={ id }/>
          ))
        }
    </Grid.Container>
  )
}

export default FavoritePokemons