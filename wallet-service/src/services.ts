import fetch from "node-fetch";
import { env } from "./core/env";
import { generateJWT } from "./core/auth";

export const checkUser = async (id: string): Promise<boolean> => {
  const token = generateJWT("internal");
  const url = `${env.USERS_SERVICE_URL}/internal/users/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data?.id === id;
};
