export default function (input: string): string {
  if (input.length < 1) return input;

  const firstLetter = input.slice(0, 1);
  const rest = input.slice(1);

  return `${firstLetter.toUpperCase()}${rest.toLowerCase()}`;
}
