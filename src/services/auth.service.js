import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getIdTokenResult
} from 'firebase/auth';
import { auth } from '../firebase';
import { adminEmails } from '../firebase';

export const authService = {
  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdTokenResult(true); // Force token refresh
    return {
      user: userCredential.user,
      isAdmin: adminEmails.includes(email)
    };
  },

  register: (email, password) => createUserWithEmailAndPassword(auth, email, password),
  
  logout: () => signOut(auth),

  isAdmin: async (user) => {
    if (!user) return false;
    const token = await getIdTokenResult(user, true); // Force token refresh
    return token.claims.admin === true || adminEmails.includes(user.email);
  },

  getCurrentUser: () => auth.currentUser,

  refreshToken: async () => {
    const user = auth.currentUser;
    if (user) {
      await user.getIdToken(true);
    }
  }
};