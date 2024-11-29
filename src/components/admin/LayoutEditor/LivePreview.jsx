import { motion } from 'framer-motion';
import { useCallback } from 'react';

export default function LivePreview({ 
  layout, 
  previewMode, 
  setPreviewMode, 
  selectedComponentId,
  onComponentSelect 
}) {
  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
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
            {settings.logo ? (
              <img 
                src={settings.logo} 
                alt="Logo" 
                className="h-8"
              />
            ) : (
              <span className="text-xl font-bold">Logo</span>
            )}
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
              <h1 className="text-4xl font-bold mb-4">
                {settings.heading || 'Welcome'}
              </h1>
              <p className="text-xl">
                {settings.subheading || 'Discover our products'}
              </p>
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

      case 'footer':
        return (
          <div 
            className="p-4"
            style={{ 
              backgroundColor: settings.backgroundColor || '#1F2937',
              color: settings.textColor || '#FFFFFF'
            }}
          >
            {settings.logo && (
              <img 
                src={settings.logo} 
                alt="Footer Logo" 
                className="h-8 mb-4"
              />
            )}
            <p className="text-sm">
              {settings.copyrightText || '© 2024 Your Store. All rights reserved.'}
            </p>
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
    <div className="flex-1 bg-gray-100 overflow-y-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          {['desktop', 'tablet', 'mobile'].map((mode) => (
            <button
              key={mode}
              onClick={() => setPreviewMode(mode)}
              className={`px-3 py-1 rounded-md text-sm ${
                previewMode === mode
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div 
        className="bg-white rounded-lg shadow-lg mx-auto transition-all duration-300"
        style={{ width: getPreviewWidth() }}
      >
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