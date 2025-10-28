import { useState } from "react";

interface SortRadioButtonsProps {
  value: "number" | "name";
  onChange: (value: "number" | "name") => void;
}

export default function SortRadioButtons({
  value,
  onChange,
}: SortRadioButtonsProps) {
  const [showOptions, setShowSortOptions] = useState(false);

  return (
    <div className="relative z-9">
      <button
        onClick={() => setShowSortOptions(!showOptions)}
        className="bg-grayscale-background border border-grayscale-light rounded-full text-primary w-[50px] h-[50px] cursor-pointer"
      >
        #
      </button>
      {showOptions && (
        <div className="absolute width-[130px] shadow-drop-6 right-0 bg-primary rounded-lg p-2">
          <div className="pb-3 px-4 text-white font-bold">Sort by:</div>
          <div className="bg-grayscale-background rounded-lg p-4">
            <label className="flex items-center cursor-pointer pb-3">
              <input
                type="radio"
                name="sort"
                value="number"
                checked={value === "number"}
                onChange={(e) => onChange(e.target.value as "number" | "name")}
                onClick={() => setShowSortOptions(!showOptions)}
                className="mr-2 accent-primary"
              />
              <span className="text-body-1 text-grayscale-dark">Number</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="sort"
                value="name"
                checked={value === "name"}
                onChange={(e) => onChange(e.target.value as "number" | "name")}
                onClick={() => setShowSortOptions(!showOptions)}
                className="mr-2 accent-primary"
              />
              <span className="text-body-1 text-grayscale-dark">Name</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
