interface PokemonStatsProps {
  stats: {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
  };
  typeColor?: string;
}

const statLabels: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

const statColors: Record<string, string> = {
  hp: "#FF5959",
  attack: "#F5AC78",
  defense: "#FAE078",
  "special-attack": "#9DB7F5",
  "special-defense": "#A7DB8D",
  speed: "#FA92B2",
};

export default function PokemonStats({ stats, typeColor }: PokemonStatsProps) {
  const maxStat = 100;

  return (
    <div className="space-y-3">
      {Object.entries(stats).map(([key, value]) => {
        const color = typeColor || statColors[key] || "#E03A2D";

        return (
          <div key={key} className="flex items-center gap-4">
            <div
              className="w-12 text-body-2 font-medium text-right"
              style={{ color }}
            >
              {statLabels[key]}
            </div>

            <div className="flex-1 flex items-center gap-3">
              <div className="w-8 text-body-2 text-grayscale-dark text-right font-medium">
                {value.toString().padStart(3, "0")}
              </div>
              <div className="flex-1 bg-grayscale-light rounded-full h-2 overflow-hidden">
                <div
                  className="h-full transition-all duration-500 ease-out rounded-full"
                  style={{
                    width: `${Math.min((value / maxStat) * 100, 100)}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
