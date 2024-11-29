import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ProductDetailsModal({ product, isOpen, onClose }) {
  if (!product) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-2">
                  {product.photos?.length > 0 && (
                    <div className="aspect-w-16 aspect-h-9 mb-6">
                      <img
                        src={product.photos[0]}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </Dialog.Title>

                  <div className="space-y-4">
                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600">{product.description}</p>

                    {/* Product Details */}
                    {product.strain && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Product Details</h4>
                        <dl className="grid grid-cols-1 gap-2">
                          {product.strain && (
                            <div className="flex items-center">
                              <dt className="text-sm text-gray-500 w-24">Strain:</dt>
                              <dd className="text-sm text-gray-900">{product.strain}</dd>
                            </div>
                          )}
                          {product.thcaPercentage && (
                            <div className="flex items-center">
                              <dt className="text-sm text-gray-500 w-24">THCA:</dt>
                              <dd className="text-sm text-gray-900">{product.thcaPercentage}%</dd>
                            </div>
                          )}
                          {product.effects && product.effects.length > 0 && (
                            <div className="flex items-center">
                              <dt className="text-sm text-gray-500 w-24">Effects:</dt>
                              <dd className="flex flex-wrap gap-1">
                                {product.effects.map(effect => (
                                  <span key={effect} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    {effect}
                                  </span>
                                ))}
                              </dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    )}

                    {/* Call to Action */}
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </button>
                      <button
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}