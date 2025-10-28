import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import PokemonDetail from '../../../components/pokemon/PokemonDetail/PokemonDetail';
import { isTokenExpired } from '@/utils/validateJWT';
import { pokemonService } from '@/utils/api/pokemonService';

interface PokemonDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PokemonDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const pokemonId = parseInt(id, 10);
    
    if (isNaN(pokemonId) || pokemonId < 1) {
      return {
        title: 'Pokemon Not Found - Pokédx',
        description: 'The requested Pokemon could not be found.',
      };
    }

    const pokemon = await pokemonService.getPokemonById(pokemonId);
    
    return {
      title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokédx`,
      description: `Discover ${pokemon.name}, a ${pokemon.types.join('/')} type Pokemon. View stats, abilities, and more information.`,
      openGraph: {
        title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokédx`,
        description: `Discover ${pokemon.name}, a ${pokemon.types.join('/')} type Pokemon.`,
        images: [
          {
            url: pokemon.image,
            width: 200,
            height: 200,
            alt: `${pokemon.name} Pokemon`,
          },
        ],
      },
      twitter: {
        card: 'summary',
        title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokédx`,
        description: `Discover ${pokemon.name}, a ${pokemon.types.join('/')} type Pokemon.`,
        images: [pokemon.image],
      },
    };
  } catch (error) {
    return {
      title: 'Pokemon Not Found - Pokédx',
      description: 'The requested Pokemon could not be found.',
    };
  }
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('pokemon_token');

  if (!tokenCookie || isTokenExpired(tokenCookie.value)) {
    redirect('/');
  }

  const { id } = await params;
  const pokemonId = parseInt(id, 10);

  if (isNaN(pokemonId) || pokemonId < 1) {
    redirect('/pokemons');
  }

  return <PokemonDetail pokemonId={pokemonId} />;
}
