import crypto from "crypto";

const separator = "|";

function make(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex"); // Hash the password with the salt
  return `${salt}${separator}${hash}`;
}

function verify(password: string, hashed: string): boolean {
  const split = hashed.split(separator);
  if (split.length !== 2) return false;
  const salt = split[0];
  const hash = split[1];

  const hashToVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return hash === hashToVerify;
}

export default {
  make,
  verify,
};
