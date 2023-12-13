import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "./env";

type KeyType = "internal" | "external";

const privateKeys = {
  internal: env.INTERNAL_PRIVATE_KEY,
  external: env.EXTERNAL_PRIVATE_KEY,
};

type Payload = {
  id: string;
};

function generateJWT(key: KeyType, payload: Payload): string {
  const privateKey = privateKeys[key];
  if (!privateKey) {
    throw new Error("Private key not found");
  }

  const token = jwt.sign(payload, privateKey, { expiresIn: "30d" });
  return token;
}

function authenticateJWT(token: string, privateKey: string) {
  try {
    const decoded = jwt.verify(token, privateKey);
    return decoded;
  } catch (err) {
    return null;
  }
}

function isValidJWT(token: string, key: KeyType) {
  return !!authenticateJWT(token, privateKeys[key]);
}

const saltRounds = 10;

function generatePasswordHash(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

function comparePasswordHash(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export { generateJWT, isValidJWT, generatePasswordHash, comparePasswordHash };
