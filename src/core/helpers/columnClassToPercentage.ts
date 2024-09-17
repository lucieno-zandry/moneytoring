export default function columnClassToPercentage(
  className: string
): string | null {
  const regex = /col(?:-\w+)?-(\d{1,2})/;

  const match = className.match(regex);

  if (match) {
    const columnNumber = parseInt(match[1], 10);

    if (columnNumber >= 1 && columnNumber <= 12) {
      const percentage = (columnNumber / 12) * 100;
      return `${percentage}%`;
    }
  }

  return null;
}
