import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import HeaderSettings from './settings/HeaderSettings';
import HeroSettings from './settings/HeroSettings';
import CategorySettings from './settings/CategorySettings';
import FeaturedSettings from './settings/FeaturedSettings';
import FooterSettings from './settings/FooterSettings';

export default function ComponentSettings({ component, onChange }) {
  const [settings, setSettings] = useState(component.settings || {});

  useEffect(() => {
    setSettings(component.settings || {});
  }, [component]);

  const handleSave = () => {
    onChange(settings);
    toast.success('Component settings saved');
  };

  const renderSettings = () => {
    switch (component.id) {
      case 'header':
        return <HeaderSettings settings={settings} onChange={setSettings} />;
      case 'hero':
        return <HeroSettings settings={settings} onChange={setSettings} />;
      case 'categories':
        return <CategorySettings settings={settings} onChange={setSettings} />;
      case 'featured':
        return <FeaturedSettings settings={settings} onChange={setSettings} />;
      case 'footer':
        return <FooterSettings settings={settings} onChange={setSettings} />;
      default:
        return (
          <div className="text-gray-500 text-center py-4">
            No settings available for this component
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-medium text-gray-900">{component.name} Settings</h3>
      </div>

      {renderSettings()}

      <div className="sticky bottom-0 bg-white p-4 border-t">
        <button
          onClick={handleSave}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}