type StringBoolean = "true" | "false";

const stringToBoolean = (string: StringBoolean) => {
  return Boolean(string === "true");
};

const booleanToString = (bool: boolean) => {
  return bool ? "true" : "false";
};

export const isFirstTime = () => {
  const isFirstTime = sessionStorage.getItem("isFirstTime") as StringBoolean | null;
  if (!isFirstTime) return false;
  return stringToBoolean(isFirstTime);
};

export const toggleFirstTime = () => {
  const firstTime = isFirstTime();
  sessionStorage.setItem("isFirstTime", booleanToString(!firstTime));
};
