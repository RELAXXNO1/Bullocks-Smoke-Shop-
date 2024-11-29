import { memo } from 'react';
import { motion } from 'framer-motion';
import useLayoutStore from '../../../stores/layoutStore';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import StoreFront from '../../StoreFront';

const Preview = memo(() => {
  const { 
    layout,
    previewMode,
    selectedComponent,
    setSelectedComponent
  } = useLayoutStore();

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  if (!layout) return null;

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
      style={{ 
        width: getPreviewWidth(),
        margin: '0 auto'
      }}
    >
      <div className="relative">
        {/* Header */}
        <motion.div
          className={`relative cursor-pointer transition-all duration-200 ${
            selectedComponent?.id === 'header' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedComponent(layout.components.find(c => c.id === 'header'));
          }}
          whileHover={{ scale: 1.01 }}
        >
          <Header isPreview settings={layout.components.find(c => c.id === 'header')?.settings} />
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="relative"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedComponent(null);
          }}
        >
          <StoreFront isPreview layout={layout} />
        </motion.div>

        {/* Footer */}
        <motion.div
          className={`relative cursor-pointer transition-all duration-200 ${
            selectedComponent?.id === 'footer' ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedComponent(layout.components.find(c => c.id === 'footer'));
          }}
          whileHover={{ scale: 1.01 }}
        >
          <Footer isPreview settings={layout.components.find(c => c.id === 'footer')?.settings} />
        </motion.div>
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';
export default Preview;