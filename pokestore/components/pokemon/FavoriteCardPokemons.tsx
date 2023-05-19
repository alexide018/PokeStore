import { FC } from 'react'
import { Grid, Card } from '@nextui-org/react';

interface Props{
    pokemonId: number;
}

export const FavoriteCardPokemons: FC<Props> = ({ pokemonId }) => {
  return (
    // Se aplica el estilo para cada uno de los elementos del arreglo
    <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 } key={ pokemonId }>
      <Card isHoverable isPressable css={{ padding: 10 }}>
          <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemonId }.svg`}
          width={'100%'}
          height={ 140 }
        >
          </Card.Image>
      </Card>
    </Grid>
  )
}
