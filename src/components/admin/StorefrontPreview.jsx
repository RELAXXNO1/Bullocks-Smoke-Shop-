import { useCallback } from 'react';
import { motion } from 'framer-motion';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default function StorefrontPreview({ layout, previewMode, onComponentSelect, selectedComponentId }) {
  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile':
        return 375;
      case 'tablet':
        return 768;
      default:
        return 1280;
    }
  };

  const renderComponent = useCallback((component) => {
    const settings = component.settings || {};
    
    switch (component.id) {
      case 'header':
        return (
          <div 
            className="relative p-4"
            style={{ 
              backgroundColor: settings.backgroundColor || '#1F2937',
              color: settings.textColor || '#FFFFFF'
            }}
          >
            {settings.announcement && (
              <div 
                className="bg-blue-600 text-white text-center text-sm py-2 mb-4"
                dangerouslySetInnerHTML={{ __html: settings.announcement }}
              />
            )}
            <div className="flex items-center justify-between">
              {settings.logo ? (
                <img 
                  src={settings.logo} 
                  alt="Logo" 
                  className="h-8"
                />
              ) : (
                <span className="text-xl font-bold">Logo</span>
              )}
              {settings.showSearch && (
                <div className="relative flex-1 max-w-lg mx-8">
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 'hero':
        return (
          <div 
            className="relative h-64 bg-cover bg-center flex items-center justify-center"
            style={{ 
              backgroundImage: settings.backgroundImage ? `url(${settings.backgroundImage})` : 'none',
              backgroundColor: settings.backgroundColor || '#1F2937'
            }}
          >
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: settings.heading || 'Welcome' }} />
              <p className="text-xl" dangerouslySetInnerHTML={{ __html: settings.subheading || 'Discover our products' }} />
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {(settings.categories || []).map((category, index) => (
              <div 
                key={index}
                className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <span className="text-lg font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        );

      case 'featured':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(settings.products || []).map((product, index) => (
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

      default:
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <span className="text-gray-500">Component: {component.name}</span>
          </div>
        );
    }
  }, []);

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
      style={{ 
        width: getPreviewWidth(),
        margin: '0 auto'
      }}
    >
      <div className="relative">
        {layout.components
          .filter(component => component.visible)
          .sort((a, b) => a.order - b.order)
          .map(component => (
            <motion.div
              key={component.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                selectedComponentId === component.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => onComponentSelect(component)}
              whileHover={{ scale: 1.01 }}
            >
              {renderComponent(component)}
            </motion.div>
          ))}
      </div>
    </div>
  );
}