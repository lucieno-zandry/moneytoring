export default function (
  condition: boolean,
  className: string,
  otherwise: string = ""
): string {
  return condition ? className : otherwise;
}
