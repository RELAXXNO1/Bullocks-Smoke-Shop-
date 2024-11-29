import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion } from 'framer-motion';
import { EyeDropperIcon } from '@heroicons/react/24/outline';

export default function ColorPalette({ colors = {}, onChange }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (color) => {
    if (selectedColor) {
      onChange({
        ...colors,
        [selectedColor]: color
      });
    }
  };

  const colorCategories = {
    primary: ['primaryColor', 'primaryLight', 'primaryDark'],
    accent: ['accentColor', 'accentLight', 'accentDark'],
    neutral: ['backgroundColor', 'textColor', 'borderColor'],
    status: ['successColor', 'warningColor', 'errorColor']
  };

  return (
    <div className="space-y-6">
      {Object.entries(colorCategories).map(([category, colorKeys]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 capitalize">
            {category} Colors
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {colorKeys.map((colorKey) => (
              <div key={colorKey} className="space-y-2">
                <label className="block text-xs text-gray-500 capitalize">
                  {colorKey.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <button
                  onClick={() => {
                    setSelectedColor(colorKey);
                    setShowPicker(true);
                  }}
                  className="w-full h-10 rounded-md shadow-sm flex items-center justify-center border hover:border-gray-400 transition-colors relative group"
                  style={{ backgroundColor: colors[colorKey] || '#FFFFFF' }}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-md transition-opacity" />
                  <EyeDropperIcon className="h-4 w-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Color Picker Modal */}
      {showPicker && selectedColor && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPicker(false);
              setSelectedColor(null);
            }
          }}
        >
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 capitalize mb-1">
                {selectedColor.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <div className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded-md border"
                  style={{ backgroundColor: colors[selectedColor] || '#FFFFFF' }}
                />
                <span className="text-sm text-gray-600">
                  {colors[selectedColor]?.toUpperCase() || '#FFFFFF'}
                </span>
              </div>
            </div>
            <HexColorPicker
              color={colors[selectedColor] || '#FFFFFF'}
              onChange={handleColorChange}
            />
            <button
              onClick={() => {
                setShowPicker(false);
                setSelectedColor(null);
              }}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}