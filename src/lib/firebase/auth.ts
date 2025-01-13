import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

export const signIntoFirebaseWithClerk = async (token: string) => {
  const userCredentials = await signInWithCustomToken(auth, token);
  console.log('User:', userCredentials.user);
};
