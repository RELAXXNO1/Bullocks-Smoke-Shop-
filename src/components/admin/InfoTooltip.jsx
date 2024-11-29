import { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function InfoTooltip({ content }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-help"
      >
        <InformationCircleIcon className="h-5 w-5" />
      </div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute z-50 w-64 p-2 mt-1 text-sm text-gray-500 bg-white border rounded-lg shadow-lg"
            style={{ transform: 'translateX(-50%)', left: '50%' }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}