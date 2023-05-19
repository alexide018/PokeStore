import Image from "next/image"
import NextLink from "next/link"
// Libreria NextUI; similar a Bootstrap
import { Spacer, Text, useTheme, Link } from "@nextui-org/react"

export const Navbar = () => {

  // 'Hook': permite hacer funcionales a los estados de React.
  const { theme } = useTheme()

  return (
    // Codigo CSS
    <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0x 20px',
        backgroundColor: theme?.colors.gray100.value
    }}>

        <NextLink href='/' passHref legacyBehavior>
          <Link>
            <Image
                src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'
                alt="icono de app"
                width={70}
                height={70}
            />
          </Link>
        </NextLink>

        <NextLink href='/' passHref legacyBehavior>
          <Link>
            <Text color='white' h2>P</Text>
            <Text color='white'h3>okémon</Text>
          </Link>
        </NextLink>

        <Spacer css={{flex: 1}}/>

        <NextLink href='/favorites' passHref legacyBehavior>
          <Link css={{ marginRight: '10px' }}>
            <Text color='white'h3>Favoritos</Text>
          </Link>
        </NextLink>
    </div>
  )
}
