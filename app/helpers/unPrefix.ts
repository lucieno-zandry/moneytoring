const defaultSeparator = ".";

export default function (str: string, separator = defaultSeparator): string {
  const separatorIndex = str.indexOf(separator);
  if (!separatorIndex) return str;

  return str.slice(separatorIndex + separator.length);
}
