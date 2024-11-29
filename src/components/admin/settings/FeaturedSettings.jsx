import { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function FeaturedSettings({ settings, onChange }) {
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.price) return;
    
    const products = settings.products || [];
    onChange({
      ...settings,
      products: [...products, { ...newProduct, price: parseFloat(newProduct.price) }]
    });
    setNewProduct({ name: '', price: '' });
  };

  const handleRemoveProduct = (index) => {
    const products = settings.products || [];
    onChange({
      ...settings,
      products: products.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Featured Products
        </label>
        <div className="space-y-2">
          {(settings.products || []).map((product, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={product.name}
                onChange={(e) => {
                  const products = [...(settings.products || [])];
                  products[index] = { ...product, name: e.target.value };
                  onChange({ ...settings, products });
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Product name"
              />
              <input
                type="number"
                value={product.price}
                onChange={(e) => {
                  const products = [...(settings.products || [])];
                  products[index] = { ...product, price: parseFloat(e.target.value) };
                  onChange({ ...settings, products });
                }}
                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Price"
                step="0.01"
              />
              <button
                onClick={() => handleRemoveProduct(index)}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="New product name"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          placeholder="Price"
          className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          step="0.01"
        />
        <button
          onClick={handleAddProduct}
          className="p-2 text-blue-600 hover:text-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}