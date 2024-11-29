import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Enhancement Products',
    description: 'Male and female enhancement supplements'
  },
  {
    name: 'Testing Products',
    description: 'Various testing solutions'
  },
  {
    name: 'Games & Entertainment',
    description: 'Board games and entertainment items'
  }
];

function Novelties() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Novelties</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Novelties;