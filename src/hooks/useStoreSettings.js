import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const defaultSettings = {
  features: {
    cart: false,
    userAccounts: true,
    reviews: false,
    wishlist: false,
    ageVerification: true
  },
  theme: {
    primaryColor: '#3B82F6',
    backgroundColor: '#F3F4F6',
    accentColor: '#10B981'
  },
  store: {
    name: 'Bullocks Smoke Shop',
    description: 'Premium smoke shop products',
    contactEmail: 'support@bullocksmokeshop.com',
    phone: '',
    address: ''
  }
};

export const useStoreSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeSettings = async () => {
      try {
        const settingsRef = doc(db, 'settings', 'store');
        await setDoc(settingsRef, defaultSettings, { merge: true });
      } catch (error) {
        console.error('Error initializing settings:', error);
        setError(error);
      }
    };

    const unsubscribe = onSnapshot(
      doc(db, 'settings', 'store'),
      (doc) => {
        if (doc.exists()) {
          setSettings(doc.data());
        } else {
          // If document doesn't exist, create it with default settings
          initializeSettings();
          setSettings(defaultSettings);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching store settings:', error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { settings, loading, error };
};