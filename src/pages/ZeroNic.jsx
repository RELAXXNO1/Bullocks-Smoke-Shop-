import { motion } from 'framer-motion';

const products = [
  'Zero exotic',
  'Geek bar pulse',
  'North vision',
  'North',
  'Raz 9000',
  'Breeze prime zero',
  'Breeze pro',
  'Dragon'
];

function ZeroNic() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Zero Nicotine Disposables</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold">{product}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ZeroNic;