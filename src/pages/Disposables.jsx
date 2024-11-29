import { motion } from 'framer-motion';

const disposables = [
  { brand: 'Torch', product: '6g live resin thca disposable' },
  { brand: 'Mellow Fellow', products: [
    '4g live resin disposable',
    '2g disposables',
    '1g disposables',
    '2g cartridge',
    '1g cartridge'
  ]},
  { brand: 'Looper', products: [
    '3g disposable',
    '2g live resin cartridge'
  ]},
  // Add more products as needed
];

function Disposables() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Disposables & Cartridges</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disposables.map((brand, index) => (
            <motion.div
              key={brand.brand}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold mb-4">{brand.brand}</h3>
              <ul className="space-y-2">
                {Array.isArray(brand.products) ? (
                  brand.products.map((product, idx) => (
                    <li key={idx} className="text-gray-600">{product}</li>
                  ))
                ) : (
                  <li className="text-gray-600">{brand.product}</li>
                )}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Disposables;