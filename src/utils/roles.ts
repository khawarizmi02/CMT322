import { Roles } from '@/types/globals';
import { auth } from '@clerk/nextjs/server';

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
};
export const isSignedIn = async () => {
  const { sessionId } = await auth();
  return !!sessionId;
};
