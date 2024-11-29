import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import InfoTooltip from './InfoTooltip';
import ConfirmDialog from './ConfirmDialog';
import ProductField from './ProductField';
import { PRODUCT_CATEGORIES } from '../../constants/productConfigs';

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [formData, setFormData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      toast.error('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(formData.id ? 'Updating product...' : 'Adding product...');

    try {
      const productData = {
        ...formData,
        category: selectedCategory.id,
        updatedAt: new Date().toISOString() // ISO string for consistent date format
      };

      // Optimistic update
      if (formData.id) {
        const updatedProducts = products.map(p => 
          p.id === formData.id ? { ...p, ...productData } : p
        );
        setProducts(updatedProducts);
        
        await updateDoc(doc(db, 'products', formData.id), productData);
        toast.success('Product updated successfully', { id: toastId });
      } else {
        const docRef = await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: new Date().toISOString()
        });
        
        // Add new product to state immediately
        setProducts(prev => [...prev, { id: docRef.id, ...productData }]);
        toast.success('Product added successfully', { id: toastId });
      }

      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.message || 'Error saving product', { id: toastId });
      // Revert optimistic update by re-fetching
      fetchProducts();
    }
  };

  const handleDelete = async (productId) => {
    const toastId = toast.loading('Deleting product...');
    
    // Optimistic delete
    const previousProducts = [...products];
    setProducts(products.filter(p => p.id !== productId));
    
    try {
      await deleteDoc(doc(db, 'products', productId));
      toast.success('Product deleted successfully', { id: toastId });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(error.message || 'Error deleting product', { id: toastId });
      // Revert optimistic delete
      setProducts(previousProducts);
    }
  };

  const resetForm = () => {
    setFormData({});
    setExpandedProduct(null);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setSelectedCategory(PRODUCT_CATEGORIES.find(c => c.id === product.category) || PRODUCT_CATEGORIES[0]);
    setExpandedProduct(product.id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
        <button
          onClick={resetForm}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Product Form */}
      {(expandedProduct || !formData.id) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {formData.id ? 'Edit Product' : 'Add New Product'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory.id}
                  onChange={(e) => {
                    const category = PRODUCT_CATEGORIES.find(c => c.id === e.target.value);
                    setSelectedCategory(category);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {PRODUCT_CATEGORIES.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.stock || ''}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Category-specific Fields */}
            <div className="space-y-6">
              <h4 className="font-medium text-gray-900">Category-specific Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCategory.fields.map(field => (
                  <ProductField
                    key={field.name}
                    field={field}
                    value={formData[field.name]}
                    onChange={(value) => setFormData({ ...formData, [field.name]: value })}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {formData.id ? 'Update' : 'Add'} Product
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Products List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {PRODUCT_CATEGORIES.find(c => c.id === product.category)?.name || 'Unknown'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${product.price?.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setProductToDelete(product.id);
                      setShowDeleteConfirm(true);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          handleDelete(productToDelete);
          setShowDeleteConfirm(false);
        }}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        type="danger"
      />
    </div>
  );
}

export default ProductManager;