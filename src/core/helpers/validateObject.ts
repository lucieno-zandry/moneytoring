export default function <T>(object: T, entriesToValidate: (keyof T)[]): boolean {

  for (let key of entriesToValidate) {
    if (!object[key]) return false;
  }

  return true;
}
