import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Batteries & Vaporizers',
    brands: [
      'Yocan',
      'Puffco',
      'Lookah',
      'Hamilton devices',
      'Smoq',
      'Pulsar',
      'Dr dabber',
      'Cyrine',
      'Dazziboxx'
    ]
  },
  {
    name: 'Glass',
    description: 'Premium glass accessories and smoking devices'
  }
];

function Accessories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Accessories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
              {category.brands ? (
                <ul className="grid grid-cols-2 gap-4">
                  {category.brands.map((brand, idx) => (
                    <li key={idx} className="text-gray-600">{brand}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">{category.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Accessories;