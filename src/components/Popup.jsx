import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function Popup({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  image,
  position = 'center',
  autoClose = 0,
  variant = 'default'
}) {
  const [shouldShow, setShouldShow] = useState(isOpen);

  useEffect(() => {
    setShouldShow(isOpen);
    
    if (autoClose > 0 && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  const positionClasses = {
    'center': 'fixed inset-0 z-50 overflow-y-auto',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'top-right': 'fixed top-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'top-left': 'fixed top-4 left-4 z-50'
  };

  const variantClasses = {
    'default': 'bg-white',
    'success': 'bg-green-50 border-green-500',
    'warning': 'bg-yellow-50 border-yellow-500',
    'error': 'bg-red-50 border-red-500',
    'info': 'bg-blue-50 border-blue-500'
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      ...(position.includes('bottom') && { y: 20 }),
      ...(position.includes('top') && { y: -20 })
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  if (position === 'center') {
    return (
      <Transition.Root show={shouldShow} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className={`relative transform overflow-hidden rounded-lg ${variantClasses[variant]} px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6`}>
                  <div className="absolute right-0 top-0 pr-4 pt-4">
                    <button
                      onClick={onClose}
                      className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  {image && (
                    <div className="mb-4">
                      <img 
                        src={image} 
                        alt="" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{content}</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }

  return (
    <AnimatePresence>
      {shouldShow && (
        <div className={positionClasses[position]}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`${variantClasses[variant]} rounded-lg shadow-lg overflow-hidden max-w-sm border`}
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <button
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              {image && (
                <div className="mt-2">
                  <img 
                    src={image} 
                    alt="" 
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
              <p className="mt-2 text-sm text-gray-500">{content}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}