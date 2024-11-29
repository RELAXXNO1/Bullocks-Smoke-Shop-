import { motion } from 'framer-motion';

const edibles = [
  { name: 'LIT 20000MG D9', price: 59.99 },
  { name: 'Space gods d9 and cbd', price: 24.99 },
  { name: 'Skyhio d8 400mg', price: 17.99 },
  { name: 'Skyhio 200mg d9', price: 20.99 },
  { name: '3chi true strains 20 gummies per pack', price: 34.99 },
  // Add more products
];

function Edibles() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edibles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {edibles.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Edibles;