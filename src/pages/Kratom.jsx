import { motion } from 'framer-motion';

const brands = [
  'Hydroxie',
  'Pure ohms',
  '7ohms',
  'Rapture Max',
  'Flying horse',
  'Jelly',
  'Kream',
  'Opia',
  'Mit 45',
  'Holy water',
  'O.P.M.S',
  'Mellow fellow',
  'Donuts',
  'Kradose',
  'Paradise kratom',
  'Royal kratom',
  'Earth kratom',
  "O'heaven",
  'The kratom company',
  'Cannaaid',
  'Chew ohms',
  'Green monkey',
  'White rabbit',
  'Maxxout',
  'Curevana',
  'Tusk',
  'Rave',
  '7tabz',
  'Ultra 7seven',
  'Xite',
  'Dozo perks',
  'FVKD',
  'Eatohms',
  'Tabz7',
  '7rx',
  'Bumble bee'
];

function Kratom() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Kratom & 7hydroxy</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {brands.map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              <h3 className="text-lg font-medium text-gray-900">{brand}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Kratom;