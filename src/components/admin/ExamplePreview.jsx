import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function ExamplePreview({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
      >
        <EyeIcon className="h-4 w-4 mr-1" />
        View Example
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-40 mt-2 p-4 bg-white rounded-lg shadow-lg border w-96"
          >
            <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
            <div className="text-sm text-gray-600">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}