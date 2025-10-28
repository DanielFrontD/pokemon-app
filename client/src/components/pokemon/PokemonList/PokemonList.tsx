"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFetchPokemons, usePokemonSearch } from "@/hooks/pokemon";
import { SearchPokemonTextField, SortRadioButtons } from "@/components";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Pagination from "./Pagination";
import PokemonListResults from "./PokemonListResults";

export default function PokemonsList() {
  const router = useRouter();
  const [sortCriteria, setSortCriteria] = useState<"number" | "name">("number");
  const [pageNumber, setPageNumber] = useState(1);

  const { searchResults, isSearching, search, clearSearch, searchQuery } =
    usePokemonSearch();
  const { pokemons, isLoading, error } = useFetchPokemons({
    pageSize: 9,
    pageNumber,
    sortCriteria,
  });

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      router.push("/logout");
    }
  };

  const handlePokemonClick = (id: number) => {
    router.push(`/pokemons/${id}`);
  };

  const displayPokemons = searchQuery ? searchResults : pokemons;
  const showLoading = searchQuery ? isSearching : isLoading;

  return (
    <ErrorBoundary>
      <div className="bg-primary min-h-screen bg-grayscale-background">
        <div className="px-6 py-4">
          <div className="max-w-6xl mx-auto items-center justify-between">
            <div className="flex justify-between items-center pb-5">
              <h1 className="text-white text-headline font-bold">Pokédex</h1>
              <button
                onClick={handleLogout}
                className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-grayscale-light font-medium"
              >
                Logout
              </button>
            </div>

            <div className="flex gap-5">
              <SearchPokemonTextField
                onSearch={search}
                isLoading={showLoading}
                placeholder="Search Pokemon..."
              />
              <SortRadioButtons
                value={sortCriteria}
                onChange={setSortCriteria}
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pb-6">
          <div className="bg-grayscale-background rounded-lg shadow-drop-2 p-4 mb-6">
            <PokemonListResults
              error={error}
              showLoading={showLoading}
              pokemons={displayPokemons}
              searchQuery={searchQuery}
              handlePokemonClick={handlePokemonClick}
            />
          </div>

          <Pagination
            searchQuery={searchQuery}
            pageNumber={pageNumber}
            pokemonsLength={pokemons.length}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}
