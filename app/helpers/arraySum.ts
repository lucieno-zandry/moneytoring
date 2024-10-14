export default function <T>(
  array: T[],
  predicate: (item: T) => number
): number {
  let sum = 0;
  array.forEach((item) => {
    sum += predicate(item);
  });
  return sum;
}
