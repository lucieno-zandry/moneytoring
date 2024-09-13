export default function (word: string): string {
  if (word.length < 2) return word.toUpperCase();
  const first = word.slice(0, 1);
  const rest = word.slice(1);
  return `${first.toUpperCase()}${rest.toLowerCase()}`;
}
