// A small 4-point sparkle star that slowly spins. Put it at the start of a heading.
// Drawn twice: a thick dark "edge" path underneath and a slightly thinner coloured "body" on top.
// Both have round line-joins, which is what makes the tips soft and rounded instead of sharp.
// Colours + speed live in index.css (.spin-star). aria-hidden: it's decoration only.
const D = "M50 10 C53 36 64 47 90 50 C64 53 53 64 50 90 C47 64 36 53 10 50 C36 47 47 36 50 10 Z";

export function SpinStar() {
  return (
    <svg className="spin-star" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path className="spin-star-edge" d={D} />
      <path className="spin-star-body" d={D} />
    </svg>
  );
}