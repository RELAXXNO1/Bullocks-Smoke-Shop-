import { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function CategorySettings({ settings, onChange }) {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    const categories = settings.categories || [];
    onChange({
      ...settings,
      categories: [...categories, { name: newCategory.trim() }]
    });
    setNewCategory('');
  };

  const handleRemoveCategory = (index) => {
    const categories = settings.categories || [];
    onChange({
      ...settings,
      categories: categories.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        <div className="space-y-2">
          {(settings.categories || []).map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={category.name}
                onChange={(e) => {
                  const categories = [...(settings.categories || [])];
                  categories[index] = { ...category, name: e.target.value };
                  onChange({ ...settings, categories });
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={() => handleRemoveCategory(index)}
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
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          onClick={handleAddCategory}
          className="p-2 text-blue-600 hover:text-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}