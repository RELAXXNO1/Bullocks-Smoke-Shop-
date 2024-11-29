import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const defaultCategories = [
  {
    name: 'THCA Flower',
    description: 'Premium quality strains',
    image: '/images/thca-flower.jpg',
    path: '/thca-flower'
  },
  {
    name: 'Disposables',
    description: 'Wide variety of vapes',
    image: '/images/disposables.jpg',
    path: '/disposables'
  },
  {
    name: 'Edibles',
    description: 'Delicious treats',
    image: '/images/edibles.jpg',
    path: '/edibles'
  },
  {
    name: 'Mushrooms',
    description: 'Exotic selection',
    image: '/images/mushrooms.jpg',
    path: '/mushrooms'
  },
  {
    name: 'CBD Products',
    description: 'Wellness solutions',
    image: '/images/cbd.jpg',
    path: '/cbd'
  },
  {
    name: 'Kratom',
    description: 'Premium varieties',
    image: '/images/kratom.jpg',
    path: '/kratom'
  }
];

function CategoriesSection({ layout }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories = layout?.components?.find(c => c.id === 'categories')?.settings?.categories || defaultCategories;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            <Link to={category.path}>
              <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                <h3>{category.name}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default CategoriesSection;