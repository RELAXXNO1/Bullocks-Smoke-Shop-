import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import HeroSection from './sections/HeroSection';
import CategoriesSection from './sections/CategoriesSection';
import FeaturedSection from './sections/FeaturedSection';
import PriceCalculator from '../PriceCalculator';
import ProductDetailsModal from '../ProductDetailsModal';
import { useProducts } from '../../hooks/useProducts';
import ErrorBoundary from '../ErrorBoundary';

function StoreFront({ isPreview = false, layout }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loading, error } = useProducts();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Store</h2>
          <p className="text-gray-600 mb-8">Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {!isPreview && <Toaster position="top-right" />}
        
        <HeroSection layout={layout} />

        <main>
          <CategoriesSection layout={layout} />
          <FeaturedSection 
            layout={layout} 
            products={products}
            loading={loading}
            onProductSelect={setSelectedProduct}
          />
        </main>

        {!isPreview && (
          <>
            <PriceCalculator isVisible={true} />
            <ProductDetailsModal
              product={selectedProduct}
              isOpen={!!selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default StoreFront;