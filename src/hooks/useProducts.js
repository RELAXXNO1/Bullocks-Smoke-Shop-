import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';

const defaultProducts = [
  {
    name: 'Sample Product 1',
    description: 'This is a sample product description.',
    price: 19.99,
    category: 'accessories',
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Sample Product 2',
    description: 'Another sample product description.',
    price: 29.99,
    category: 'accessories',
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const useProducts = (category = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initializeProducts = async () => {
    try {
      console.log('Initializing default products...');
      const batch = [];
      for (const product of defaultProducts) {
        batch.push(addDoc(collection(db, 'products'), product));
      }
      await Promise.all(batch);
      console.log('Default products initialized successfully');
    } catch (error) {
      console.error('Error initializing products:', error);
      setError(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let productsQuery = collection(db, 'products');
        
        if (category) {
          productsQuery = query(
            productsQuery,
            where('category', '==', category),
            orderBy('createdAt', 'desc')
          );
        } else {
          productsQuery = query(
            productsQuery,
            orderBy('createdAt', 'desc')
          );
        }

        const snapshot = await getDocs(productsQuery);
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // If no products exist, initialize with defaults
        if (productsData.length === 0 && !category) {
          await initializeProducts();
          // Fetch again after initialization
          const newSnapshot = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));
          const newProductsData = newSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProducts(newProductsData);
        } else {
          setProducts(productsData);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};