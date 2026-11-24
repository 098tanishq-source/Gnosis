import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  sendEmailVerification
} from '../styles/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signupWithEmail = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    try {
      await sendEmailVerification(user, {
        url: window.location.origin + window.location.pathname + '#dashboard',
        handleCodeInApp: false
      });
    } catch (err) {
      console.warn('Verification dispatch notice:', err);
    }
    return user;
  };

  const loginWithEmail = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential.user;
  };

  const logout = () => {
    return signOut(auth);
  };

  const resendVerification = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser, {
        url: window.location.origin + window.location.pathname + '#dashboard',
        handleCodeInApp: false
      });
      return true;
    }
    return false;
  };

  const checkVerification = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setCurrentUser({ ...auth.currentUser });
      return auth.currentUser.emailVerified;
    }
    return false;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signupWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
    resendVerification,
    checkVerification,
    isEmailVerified: currentUser ? currentUser.emailVerified : false
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}