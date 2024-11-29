import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import useAgeVerificationStore from '../stores/ageVerificationStore';

export default function AgeVerification() {
  const [showVerification, setShowVerification] = useState(false);
  const { currentUser } = useAuth();
  const { isVerified, setVerified } = useAgeVerificationStore();

  useEffect(() => {
    // Check verification status whenever component mounts or currentUser changes
    if (!isVerified && !currentUser) {
      setShowVerification(true);
    }
  }, [isVerified, currentUser]);

  const handleVerify = () => {
    setVerified(true);
    setShowVerification(false);
  };

  const handleDeny = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!showVerification || isVerified || currentUser) {
    return null;
  }

  return (
    <AnimatePresence>
      <Dialog
        as={motion.div}
        static
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        open={showVerification}
        onClose={() => {}}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-lg max-w-md w-full p-6 text-center"
          >
            <ExclamationTriangleIcon 
              className="mx-auto h-12 w-12 text-yellow-400 mb-4"
              aria-hidden="true"
            />
            
            <Dialog.Title
              as="h3"
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              Age Verification Required
            </Dialog.Title>

            <div className="mt-4">
              <p className="text-gray-600 mb-6">
                You must be 21 years or older to visit this website.
                By clicking "I'm 21 or Older", you confirm that you are of legal age.
              </p>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleVerify}
                  className="w-full px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                >
                  I'm 21 or Older
                </button>
                <button
                  onClick={handleDeny}
                  className="w-full px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  I'm Under 21
                </button>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                This website contains age-restricted products.
              </p>
            </div>
          </motion.div>
        </div>
      </Dialog>
    </AnimatePresence>
  );
}