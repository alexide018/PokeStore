import { useEffect, useState } from 'react'
import { Layout } from '../../../components/layouts'
import { NoFavorites } from '../../../components/ui'
import { localFavorites } from '../../../utils'
import { FavoritePokemons } from '../../../components/pokemon'


function FavoritesPage() {
  
  // 'useState' para actulizar estado de favoritos 
const [favoritePokemons, setfavoritePokemons] = useState<number[]>([])

  // Cargar arreglo desde el lado del cliente
  // El arreglo fue obtenido desde '/utils'
  useEffect(() => {
    setfavoritePokemons( localFavorites.pokemons() )
  }, [])
  

  return (

    // Llama componente para crear pagina
    <Layout title='Pokemons - Favoritos'>
      {/* Condicional para mostrar cuando haya o no haya favoritos */}
      {
        favoritePokemons.length === 0
          ? ( <NoFavorites/> )
          : ( <FavoritePokemons pokemons={favoritePokemons}/> )
      }
    </Layout>

  )
}

export default FavoritesPage