// A small 4-point sparkle star that slowly spins. Put it at the start of a heading.
// Colours + speed live in index.css (.spin-star). aria-hidden: it's decoration only.
export function SpinStar() {
  return (
    <svg className="spin-star" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d="M50 3 C54 34 66 46 97 50 C66 54 54 66 50 97 C46 66 34 54 3 50 C34 46 46 34 50 3 Z" />
    </svg>
  );
}
