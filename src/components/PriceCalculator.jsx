import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { CalculatorIcon } from '@heroicons/react/24/outline';

function PriceCalculator({ isVisible }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline || !isVisible) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          quantity: 0,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [isOnline, isVisible]);

  const updateQuantity = (productId, newQuantity) => {
    const updatedProducts = products.map(product => 
      product.id === productId 
        ? { ...product, quantity: Math.max(0, parseInt(newQuantity) || 0) }
        : product
    );
    setProducts(updatedProducts);
    calculateTotal(updatedProducts);
  };

  const calculateTotal = (updatedProducts) => {
    const newTotal = updatedProducts.reduce((sum, product) => 
      sum + (product.price * product.quantity), 0
    );
    setTotal(newTotal);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <CalculatorIcon className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-2xl w-80 max-h-[70vh] overflow-hidden"
          >
            <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Quick Calculator</h2>
                <span className="text-lg font-bold text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-4 border-b">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="overflow-y-auto max-h-[50vh] p-4">
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="text-center py-2 text-red-600 text-sm">
                  <p>{error}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map(product => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0 mr-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">${product.price}</p>
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={product.quantity}
                        onChange={(e) => updateQuantity(product.id, e.target.value)}
                        className="w-16 p-1 border rounded-lg text-right focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t">
              <button
                onClick={() => setIsExpanded(false)}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Close Calculator
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PriceCalculator;