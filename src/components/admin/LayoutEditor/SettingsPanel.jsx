import { motion } from 'framer-motion';
import ComponentSettings from '../ComponentSettings';
import ColorPalette from '../ColorPalette';

export default function SettingsPanel({ 
  selectedComponent, 
  onSettingsChange, 
  theme, 
  onThemeChange 
}) {
  return (
    <div className="w-80 bg-white border-l overflow-y-auto">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Settings</h3>
        {selectedComponent ? (
          <ComponentSettings
            component={selectedComponent}
            onChange={onSettingsChange}
          />
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Theme Colors</h4>
              <ColorPalette
                colors={theme}
                onChange={onThemeChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}