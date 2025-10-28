interface ChangePokemonArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
}

export default function ChangePokemonArrow({
  direction,
  onClick,
  disabled = false
}: ChangePokemonArrowProps) {

  if (disabled) {
    return null
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer text-white"
    >
      {direction === 'left' ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      )}
    </button>
  );
}
