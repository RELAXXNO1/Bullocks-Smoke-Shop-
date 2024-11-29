import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useStoreLayout } from '../hooks/useStoreLayout';
import { useState, useEffect } from 'react';
import Popup from '../components/Popup';

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

function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { layout, loading: layoutLoading } = useStoreLayout();
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  useEffect(() => {
    if (layout?.popups) {
      const enabledPopups = layout.popups.filter(popup => popup.enabled);
      if (enabledPopups.length > 0) {
        const popup = enabledPopups[0];
        const timer = setTimeout(() => {
          setShowPromoPopup(true);
        }, popup.delay || 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [layout]);

  const renderHeroSection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gray-900 h-[70vh]"
      style={{ backgroundColor: layout?.theme?.primaryColor }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/hero-bg.jpg"
          alt="Store front"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Your Premium Smoke Shop
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-xl text-gray-300 max-w-3xl"
        >
          Discover our extensive collection of premium products
        </motion.p>
      </div>
    </motion.div>
  );

  const renderCategoriesGrid = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
      >
        {defaultCategories.map((category, index) => (
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

  const renderFeaturedProducts = () => (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {/* Featured products will be dynamically loaded */}
        </div>
      </div>
    </div>
  );

  const componentMap = {
    hero: renderHeroSection,
    categories: renderCategoriesGrid,
    featured: renderFeaturedProducts
  };

  return (
    <div 
      className="bg-gray-50" 
      style={{ backgroundColor: layout?.theme?.backgroundColor }}
    >
      {layout?.components
        ?.sort((a, b) => a.order - b.order)
        .filter(component => component.visible)
        .map(component => {
          const Component = componentMap[component.id];
          return Component ? <div key={component.id}>{Component()}</div> : null;
        })}

      {layout?.popups?.map(popup => (
        popup.enabled && (
          <Popup
            key={popup.id}
            isOpen={showPromoPopup}
            onClose={() => setShowPromoPopup(false)}
            title={popup.title}
            content={popup.content}
            position="bottom-right"
            autoClose={5000}
          />
        )
      ))}
    </div>
  );
}

export default Home;