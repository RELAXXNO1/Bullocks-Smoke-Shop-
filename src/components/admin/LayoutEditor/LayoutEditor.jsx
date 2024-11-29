import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useLayoutStore from '../../../stores/layoutStore';
import ComponentList from './ComponentList';
import Preview from './Preview';
import SettingsPanel from './SettingsPanel';

export default function LayoutEditor() {
  const { 
    layout,
    loading,
    error,
    fetchLayout,
    selectedComponent,
    setSelectedComponent,
    updateComponent,
    previewMode,
    setPreviewMode
  } = useLayoutStore();

  useEffect(() => {
    fetchLayout();
  }, [fetchLayout]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ComponentList />
      
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

        <Preview />
      </div>

      <SettingsPanel
        selectedComponent={selectedComponent}
        onSettingsChange={(settings) => {
          if (selectedComponent) {
            updateComponent(selectedComponent.id, settings);
          }
        }}
      />
    </div>
  );
}