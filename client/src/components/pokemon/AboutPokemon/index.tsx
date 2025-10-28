import { ReactNode } from 'react';

interface AboutPokemonProps {
  icon?: ReactNode;
  value: string | number;
  label: string;
}

export default function AboutPokemon({ value, label }: AboutPokemonProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-grayscale-background rounded-lg">
      {/* TODO: Add icons */}
      {/* <div className="text-grayscale-medium">
        {icon}
      </div> */}

      <div className="flex-1">
        <div className="text-body-1 text-grayscale-dark font-medium">
          {value}
        </div>
        <div className="text-body-2 text-grayscale-medium">
          {label}
        </div>
      </div>
    </div>
  );
}
