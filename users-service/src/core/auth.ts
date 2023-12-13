import jwt from "jsonwebtoken";
import { env } from "./env";

const privateKeys = {
  internal: env.INTERNAL_PRIVATE_KEY,
  external: env.EXTERNAL_PRIVATE_KEY,
};

function generateJWT(key: keyof typeof privateKeys): string {
  const privateKey = privateKeys[key];
  if (!privateKey) {
    throw new Error("Private key not found");
  }

  const token = jwt.sign({}, privateKey, { expiresIn: "30d" });
  return token;
}

function authenticateJWT(token: string, privateKey: string) {
  try {
    const decoded = jwt.verify(token, privateKey);
    return decoded;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function isValidJWT(token: string, key: keyof typeof privateKeys) {
  return !!authenticateJWT(token, privateKeys[key]);
}

export { generateJWT, isValidJWT };
