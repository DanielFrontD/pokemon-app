import { PokemonDetail } from "@/types/pokemon";
import { ChangePokemonArrow } from "@/components";
import { getPrimaryTypeColor } from "@/utils/typeColors";

interface PokemonDetailHeaderProps {
  pokemon: PokemonDetail;
  onNavigateBack: () => void;
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
}

export default function PokemonDetailHeader({
  pokemon,
  onNavigateBack,
  onNavigateNext,
  onNavigatePrevious,
  canNavigateNext,
  canNavigatePrevious,
}: PokemonDetailHeaderProps) {
  return (
    <div>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateBack}
              className="text-white hover:opacity-80"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>

            <div>
              <h1 className="text-white text-headline font-bold capitalize">
                {pokemon.name}
              </h1>
            </div>
          </div>

          <div className="text-white text-subtitle-1 font-bold">
            #{pokemon.id.toString().padStart(3, "0")}
          </div>
        </div>
      </div>

      <div className="px-6 py-8 rounded-b-lg relative">
        <div className="flex items-center justify-center relative">
          <div className="absolute left-0">
            <ChangePokemonArrow
              direction="left"
              onClick={onNavigatePrevious}
              disabled={!canNavigatePrevious}
            />
          </div>
          <div className="h-[180px]">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-[320px] object-contain"
            />
          </div>
          <div className="absolute right-0">
            <ChangePokemonArrow
              direction="right"
              onClick={onNavigateNext}
              disabled={!canNavigateNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
