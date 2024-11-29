import { memo } from 'react';

const Featured = memo(({ settings = {} }) => {
  const { products = [] } = settings;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="aspect-square bg-gray-100 rounded mb-2" />
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

Featured.displayName = 'Featured';
export default Featured;