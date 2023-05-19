import { FC } from "react"
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { SmallPokemon } from "../../interfaces";
import { useRouter } from "next/router";

// Interfaz con props de 'SmallPokemon'
interface Props {
    pokemon: SmallPokemon;
}

// Componente funcional con tipado de 'Props'
// Destructuracion para asignarle atributos a cada pokemon
export const PokemonCard: FC<Props> = ({ pokemon }) => {

  // 'Hook' que permite crear rutas (URL)
  const router = useRouter()

  // Asignando URL
  const onClick = () => {
    // Ruteado desde el lado del cliente
    router.push(`/name/${ pokemon.name }`)
  }

  return (
    // Componentes propios de NextUI
    <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 } key={ pokemon.id }>
              <Card 
                isHoverable 
                isPressable
                onClick={ onClick }
                >
                <Card.Body css={{ p: 1 }}>
                  <Card.Image
                    // Referenciando propìedad 'img' de objeto 'pokemon'
                    src= { pokemon.img } 
                    width='100%'
                    height={ 140 }
                  />
                </Card.Body>
                <Card.Footer>
                  <Row justify='space-between'>
                    {/* // Referenciando propìedad 'name' de objeto 'pokemon' */}
                    <Text transform='capitalize'>{ pokemon.name }</Text>
                    {/* // Referenciando propìedad 'id' de objeto 'pokemon' */}
                    <Text>#{ pokemon.id }</Text>
                  </Row>
                </Card.Footer>
              </Card>              
            </Grid>
  )
}
