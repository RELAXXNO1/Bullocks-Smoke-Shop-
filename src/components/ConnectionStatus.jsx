import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { enableNetwork, disableNetwork } from 'firebase/firestore';
import { db } from '../firebase';
import { WifiIcon, NoSymbolIcon } from '@heroicons/react/24/outline';

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      enableNetwork(db);
      const timer = setTimeout(() => setShowBanner(false), 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
      disableNetwork(db);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className={`fixed top-0 left-0 right-0 z-50 p-4 ${
            isOnline ? 'bg-green-50' : 'bg-yellow-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {isOnline ? (
              <>
                <WifiIcon className="h-5 w-5 text-green-500" />
                <span className="text-green-700">Back online</span>
              </>
            ) : (
              <>
                <NoSymbolIcon className="h-5 w-5 text-yellow-500" />
                <span className="text-yellow-700">
                  You're offline. Some features may be limited.
                </span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}