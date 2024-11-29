import { initializeApp } from 'firebase/app';
import { 
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { firebaseConfig, validateConfig } from './config/firebase.config';

// Initialize Firebase services
let app;
let db;
let auth;
let storage;
let analytics = null;

try {
  // Validate environment variables
  validateConfig();

  // Initialize Firebase app
  app = initializeApp(firebaseConfig);

  // Initialize Firestore with multi-tab persistence support
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  });

  // Initialize Auth
  auth = getAuth(app);

  // Initialize Storage
  storage = getStorage(app);

  // Initialize Analytics conditionally
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(error => {
    console.error('Analytics initialization error:', error);
  });

} catch (error) {
  console.error('Firebase initialization error:', error);
  
  // Provide fallback initialization for critical services
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  if (!db) {
    db = getFirestore(app);
  }
  if (!auth) {
    auth = getAuth(app);
  }
  if (!storage) {
    storage = getStorage(app);
  }
}

// Custom claim for age verification
auth?.onAuthStateChanged(async (user) => {
  if (user) {
    const token = await user.getIdTokenResult();
    if (token.claims.age_verified) {
      localStorage.setItem('age_verified', 'true');
    }
  }
});

// List of admin emails
export const adminEmails = [
  'admin@test.com',
  'travisbishopmackie@gmail.com',
  'harbosamah@gmail.com'
];

export { app, db, auth, storage, analytics };