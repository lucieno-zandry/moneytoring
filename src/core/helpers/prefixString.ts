const defaultSeparator = ".";

export default function (
  prefix: string,
  str: string,
  separator: string = defaultSeparator
) {
  return `${prefix}${separator}${str}`;
}
