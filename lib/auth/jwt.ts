import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserSession } from "@/types/user";

const JWT_SECRET = process.env.AUTH_SECRET || "devtool_secure_fallback_secret_must_change_in_prod_key";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export function signToken(payload: UserSession): string {
  return jwt.sign(payload, JWT_SECRET, { 
    algorithm: "HS256", 
    expiresIn: "1d" 
  });
}

export function verifyToken(token: string): UserSession | null {
  try {
    return jwt.verify(token, JWT_SECRET, { 
      algorithms: ["HS256"] 
    }) as UserSession;
  } catch {
    return null;
  }
}
