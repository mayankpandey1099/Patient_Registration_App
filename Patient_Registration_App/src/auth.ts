import jwt from "jsonwebtoken";
import type { User } from "./types";

const SECRET = import.meta.env.VITE_JWT_SECRET; 

export const generateToken = (user: User): string => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (
  token: string | null
): { id: number; email: string } | null => {
  try {
    return token
      ? (jwt.verify(token, SECRET) as { id: number; email: string })
      : null;
  } catch {
    return null;
  }
};
