import randomInt from "./randomInt";

export default function (length: number = 16) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomInt(0, characters.length));
  }

  return result;
}
