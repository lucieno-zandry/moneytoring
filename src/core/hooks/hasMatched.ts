import strIncludes from "./strIncludes";

const hasMatched = (values: unknown[], search: string): boolean => {

  for (let value of values) {
    switch (typeof value) {
      case "string":
        if (strIncludes(value, search)) return true;
        break;

      case "number":
        if (strIncludes(value.toString(), search)) return true;
        break;

      default:
        console.log(value);
        if (Array.isArray(value)) {
          if (hasMatched(value, search)) return true;
        } else if (value instanceof Object) {
          const innerValues: typeof values = Object.values(value);
          if (hasMatched(innerValues, search)) return true;
        }
        break;
    }
  }

  return false;
};

export default hasMatched;
