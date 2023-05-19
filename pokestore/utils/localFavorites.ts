
// Manejo de favoritos
// Graba en LocalStorage
const toggleFavorites = ( id: number ) => {

    // Transforma el objeto JSON en el LocalStorage
    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' )

    // Si encuentra el 'id' en el arreglo 'favorites' 
    if (  favorites.includes(id) ) {
        // Lo elimina
        favorites = favorites.filter( pokeId => pokeId != id )
    } else {
        // Lo agrega
        favorites.push( id )
    }

    // Guarda el nuevo arreglo
    // 'stringify' convierte a un JSON/String
    localStorage.setItem('favorites', JSON.stringify( favorites ))
}

// Verificar si existe en LocalStorage
// Regresa booleano por '.includes'
const existInFavorites = ( id: number ): boolean => {
    
    if (typeof window === 'undefined' ) return false

    // Obtiene el ebjeto del JSON en el LocalStorage
    // 'const' ya que no se manipulará
    const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' )
    
    // 'includes' devuelvre booleano si encuentra o no 'id'
    return favorites.includes( id )
}


// Arreglo que obtiene todos los pokemons alnacenados en localStorage
const pokemons = (): number[] => {
    return JSON.parse( localStorage.getItem('favorites') || '[]' )
}

// Exportando componentes
export default{
    toggleFavorites,
    existInFavorites,
    pokemons
}
