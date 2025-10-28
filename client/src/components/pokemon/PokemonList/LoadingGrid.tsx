export default function LoadingGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-drop-2 p-4 animate-pulse"
        >
          <div className="h-4 bg-grayscale-light rounded mb-2"></div>
          <div className="h-24 bg-grayscale-light rounded mb-3"></div>
          <div className="h-4 bg-grayscale-light rounded"></div>
        </div>
      ))}
    </div>
  );
}
