import { motion } from 'framer-motion';
import LoadingSkeleton from '../../LoadingSkeleton';

function FeaturedSection({ layout, products, loading, onProductSelect }) {
  const featuredSettings = layout?.components?.find(c => c.id === 'featured')?.settings || {};
  const featuredProducts = products?.filter(p => featuredSettings.products?.includes(p.id)) || [];

  if (loading) {
    return <LoadingSkeleton type="product" count={4} />;
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => onProductSelect(product)}
            >
              {product.photos?.[0] && (
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.photos[0]}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
              )}
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${product.price?.toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedSection;