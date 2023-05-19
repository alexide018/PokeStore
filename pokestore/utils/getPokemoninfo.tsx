import { pokeApi } from "../api"
import { Pokemon } from "../interfaces"

export const getPokemonInfo = async( nameOrId: string) => {

  // 'data' contiene a los pokemons con todos los atributos debido a interfaz 'Pokemon'
  // La URL sera consultada con argumento de [name]
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ nameOrId }`)

  // Llamando solo datos necesarios
  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites
  }
}