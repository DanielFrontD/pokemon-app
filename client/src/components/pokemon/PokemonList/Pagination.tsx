interface PaginationProps {
  pokemonsLength: number;
  searchQuery: string;
  setPageNumber: (value: number | ((prev: number) => number)) => void;
  pageNumber: number;
}

export default function Pagination({
  pokemonsLength,
  searchQuery,
  setPageNumber,
  pageNumber,
}: PaginationProps) {
  if (searchQuery && !pokemonsLength) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8 gap-4">
      <button
        onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
        disabled={pageNumber === 1}
        className="px-4 py-2 bg-white rounded-lg shadow-drop-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-drop-6"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-white rounded-lg shadow-drop-2">
        Page {pageNumber}
      </span>
      <button
        onClick={() => setPageNumber((prev) => prev + 1)}
        disabled={pokemonsLength < 9}
        className="px-4 py-2 bg-white rounded-lg shadow-drop-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-drop-6"
      >
        Next
      </button>
    </div>
  );
}
