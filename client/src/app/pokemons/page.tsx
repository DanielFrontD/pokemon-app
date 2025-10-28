import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import PokemonsList from '../../components/pokemon/PokemonList/PokemonList';
import { isTokenExpired } from '@/utils/validateJWT';

export const metadata: Metadata = {
  title: 'Pokemon Search - Pokédx',
  description: 'Search and discover Pokemon. Browse through hundreds of Pokemon with detailed information, stats, and abilities.',
  openGraph: {
    title: 'Pokemon Search - Pokédx',
    description: 'Search and discover Pokemon. Browse through hundreds of Pokemon with detailed information.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pokemon Search - Pokédx',
    description: 'Search and discover Pokemon. Browse through hundreds of Pokemon with detailed information.',
  },
};

export default async function PokemonsPage() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('pokemon_token');

  if (!tokenCookie || isTokenExpired(tokenCookie.value)) {
    redirect('/');
  }

  return <PokemonsList />
}
