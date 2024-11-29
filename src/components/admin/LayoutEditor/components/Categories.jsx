import { memo } from 'react';

const Categories = memo(({ settings = {} }) => {
  const { categories = [] } = settings;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {categories.map((category, index) => (
        <div 
          key={index}
          className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
        >
          <span className="text-lg font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  );
});

Categories.displayName = 'Categories';
export default Categories;