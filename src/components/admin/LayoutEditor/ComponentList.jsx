import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useLayoutStore from '../../../stores/layoutStore';

export default function ComponentList() {
  const { 
    layout,
    selectedComponent,
    setSelectedComponent,
    toggleComponentVisibility
  } = useLayoutStore();

  if (!layout?.components) return null;

  return (
    <div className="w-64 bg-white border-r overflow-y-auto p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Components</h3>
      <div className="space-y-2">
        {layout.components
          .sort((a, b) => a.order - b.order)
          .map((component) => (
            <motion.div
              key={component.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                selectedComponent?.id === component.id
                  ? 'bg-blue-50 ring-1 ring-blue-500'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedComponent(component)}
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-sm font-medium text-gray-900">
                {component.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleComponentVisibility(component.id);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {component.visible ? (
                  <EyeIcon className="h-4 w-4" />
                ) : (
                  <EyeSlashIcon className="h-4 w-4" />
                )}
              </button>
            </motion.div>
          ))}
      </div>
    </div>
  );
}