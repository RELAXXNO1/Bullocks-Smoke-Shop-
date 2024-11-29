import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore,
  enableIndexedDbPersistence,
  getFirestore as getExistingFirestore
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { firebaseConfig } from '../config/firebase.config';
import logger from '../utils/logger';

class FirebaseService {
  constructor() {
    if (FirebaseService.instance) {
      return FirebaseService.instance;
    }
    FirebaseService.instance = this;
    this.initialize();
  }

  async initialize() {
    try {
      // Initialize or get existing Firebase app
      if (!getApps().length) {
        this.app = initializeApp(firebaseConfig);
      } else {
        this.app = getApps()[0];
      }

      // Get existing Firestore instance or initialize new one
      try {
        this.db = getExistingFirestore();
      } catch {
        this.db = getFirestore(this.app);
        // Enable persistence
        try {
          await enableIndexedDbPersistence(this.db);
          logger.info('Firestore persistence enabled');
        } catch (err) {
          if (err.code === 'failed-precondition') {
            logger.warn('Multiple tabs open, persistence enabled in first tab only');
          } else if (err.code === 'unimplemented') {
            logger.warn('Browser doesn\'t support persistence');
          }
        }
      }

      // Initialize other services
      this.auth = getAuth(this.app);
      this.storage = getStorage(this.app);

      // Initialize Analytics if supported
      const analyticsSupported = await isSupported();
      if (analyticsSupported) {
        this.analytics = getAnalytics(this.app);
      }

    } catch (error) {
      logger.error('Firebase initialization error:', error);
      throw error;
    }
  }

  // Getters for Firebase services
  getApp() { return this.app; }
  getDb() { return this.db; }
  getAuth() { return this.auth; }
  getStorage() { return this.storage; }
  getAnalytics() { return this.analytics; }
}

// Create singleton instance
const firebaseService = new FirebaseService();

// Export Firebase service instances
export const app = firebaseService.getApp();
export const db = firebaseService.getDb();
export const auth = firebaseService.getAuth();
export const storage = firebaseService.getStorage();
export const analytics = firebaseService.getAnalytics();

// Export the service instance itself
export default firebaseService;