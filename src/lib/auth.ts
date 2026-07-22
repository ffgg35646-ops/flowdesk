import { cookies } from "next/headers";
import { verifyToken } from "@/lib/token";

interface AuthUser {
  userId: string;
  role: string;
  companyId: string;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("flowdesk_token")?.value;

  if (!token) {
    return null;
  }

  try {
    return verifyToken(token) as AuthUser;
  } catch {
    return null;
  }
}
