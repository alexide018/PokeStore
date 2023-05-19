// '[id]' permite tomar un identificar del codigo para generar n paginas

import { useState } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { pokeApi } from '../../../api';
import { Layout } from '../../../components/layouts'
import { Pokemon, PokemonListResponse } from '../../../interfaces';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { getPokemonInfo, localFavorites } from '../../../utils';
import confetti from 'canvas-confetti'

// Interfaz para tipado TS
interface Props{
  pokemon: Pokemon
}

// Genera paginas con informacion con 'id' y 'name' de cada pokemon
// Desestructuracion de 'props' necesarios 
const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  // Hook que mantiene y modifica el estado de componente
  // 'localFavorite.existInFavorite( pokemon.id )' indica el estado si esta o no en favoritos
  const [isInFavorites, setisInFavorites] = useState( typeof window === 'undefined' && localFavorites.existInFavorites( pokemon.id ) )

  // Guarda al pokemon en 'favoritos'
  const onToggleFavorite = () => {
    // Importa funcion 'toggleFavorite' de 'localFavorite' pasando prop 'id'
    localFavorites.toggleFavorites( pokemon.id )
    setisInFavorites( !isInFavorites )
    
    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }

  return (
    // 'Layout': componente creado
    // Muestra el titulo con el nombre del pokemon
    <Layout title={ pokemon.name }>
      {/* Estilo para cartas pokemon */}
      <Grid.Container css={{ marginTop: '3px' }} gap={ 2 }>
        {/* Carta principal */}
        <Grid xs={ 12 } sm={ 4 }>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                alt={ pokemon.name }
                width= '100%'
                height={ 200 }
                />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={ 12 } sm={ 8 }>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize' >{ pokemon.name }</Text>
              <Button 
                color={'gradient'}           
                ghost={ !isInFavorites }
                // Agrega funcion 'onToggleFavorite' en el boton y se ejecuta cuando se presiona
                onPress={ onToggleFavorite }
              >
                { isInFavorites ? 'En favoritos' : 'Guradar en favoritos' }
              </Button>
            </Card.Header>
            {/* Cartas secundarias */}
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex' gap={ 0 }>
                <Image
                src={pokemon.sprites.front_default}
                alt={ pokemon.name}
                width={ 100 }
                height={ 100 }
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={ pokemon.name}
                  width={ 100 }
                  height={ 100 }
                  />
                <Image
                src={pokemon.sprites.front_shiny}
                alt={ pokemon.name}
                width={ 100 }
                height={ 100 }
                />
                <Image
                src={pokemon.sprites.back_shiny}
                alt={ pokemon.name}
                width={ 100 }
                height={ 100 }
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}


// Al ser [name] dinamico se utiliza 'GetStaticPaths' para generar rutas estaticas (pre-renderizar).
// Se ejecuta en el lado del servidor y en 'build time'
// Se crean primero las paginas y despues recibiran los argumentos para su presentacion
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  // Funcion que crea un arreglo de pokemons del 1 al 151
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  
  // Funcion que mete a un arreglo los 'name' de cada pokemon
  const pokemonName: string[] = data.results.map( pokemon => pokemon.name )

  return {
    // Cantidad de paginas que se crearan
    paths: pokemonName.map( name => ({
      // Parametro que recibira [name] (deben ser 'string' por ser URL)
      params: { name }
    })),
    // Manda 'erro404' si se ingresa a una URL no encontrada
    fallback: false
  }
}

// Destructuracion de ctx (contexto). Recibe los id
export const getStaticProps: GetStaticProps = async ( { params } ) => {

  // Creando variable 'name' que viene de ctx destructurada y tipada como string
  const { name } = params as { name: string }

  return {
    props: {
      // Objeto 'pokemon' contenido en 'data'
      pokemon: await getPokemonInfo( name )
    }
  }
}

export default PokemonByNamePage