import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import LoadingSkeleton from '../components/LoadingSkeleton';
import toast from 'react-hot-toast';

function THCAFlower() {
  const { products, loading, error } = useProducts('thca-flower');

  if (loading) {
    return <LoadingSkeleton type="product" count={6} />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Products</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Products Available</h2>
          <p className="text-gray-600">Check back soon for new products!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">THCA Flower</h1>
        <div className="prose max-w-none mb-8">
          <p className="text-lg text-gray-600">
            Discover our premium selection of THCA flower strains, carefully curated for quality and potency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {product.photos?.[0] && (
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={product.photos[0]} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {product.strain && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {product.strain}
                    </span>
                  )}
                  {product.thcaPercentage && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      {product.thcaPercentage}% THCA
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">
                    ${product.price?.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default THCAFlower;