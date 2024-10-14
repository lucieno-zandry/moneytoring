export function addMinutes(minutes: number, date: Date = new Date()): Date {
  let result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}