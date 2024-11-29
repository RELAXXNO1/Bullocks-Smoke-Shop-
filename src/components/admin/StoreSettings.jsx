import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion } from 'framer-motion';
import { useStoreSettings } from '../../hooks/useStoreSettings';
import toast from 'react-hot-toast';
import InfoTooltip from './InfoTooltip';
import ConfirmDialog from './ConfirmDialog';

const defaultSettings = {
  features: {
    cart: false,
    userAccounts: true,
    reviews: false,
    wishlist: false,
    ageVerification: true
  },
  theme: {
    primaryColor: '#3B82F6',
    backgroundColor: '#F3F4F6',
    accentColor: '#10B981'
  },
  store: {
    name: 'Bullocks Smoke Shop',
    description: 'Premium smoke shop products',
    contactEmail: 'support@bullocksmokeshop.com',
    phone: '',
    address: ''
  }
};

export default function StoreSettings() {
  const { settings, loading, error } = useStoreSettings();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings || defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    document.title = 'Store Settings | Admin Dashboard';
  }, []);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  useEffect(() => {
    // Check if settings have changed
    const settingsChanged = JSON.stringify(settings) !== JSON.stringify(localSettings);
    setHasChanges(settingsChanged);
  }, [settings, localSettings]);

  const handleToggleFeature = (feature) => {
    setLocalSettings(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature]
      }
    }));
  };

  const handleUpdateTheme = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        [key]: value
      }
    }));
  };

  const handleUpdateStore = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      store: {
        ...prev.store,
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const toastId = toast.loading('Saving settings...');

    try {
      await setDoc(doc(db, 'settings', 'store'), localSettings);
      toast.success('Settings saved successfully', { id: toastId });
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings', { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setShowResetConfirm(false);
    const toastId = toast.loading('Resetting settings...');
    
    try {
      await setDoc(doc(db, 'settings', 'store'), defaultSettings);
      setLocalSettings(defaultSettings);
      toast.success('Settings reset to default', { id: toastId });
      setHasChanges(false);
    } catch (error) {
      console.error('Error resetting settings:', error);
      toast.error('Failed to reset settings', { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="h-32 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading settings</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error.message || 'Please try again later.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="p-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Store Settings</h3>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowResetConfirm(true)}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Feature Toggles */}
      <section className="bg-white rounded-lg shadow p-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Features</h4>
        <div className="space-y-4">
          {Object.entries(localSettings.features).map(([feature, enabled]) => (
            <div key={feature} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  {feature.charAt(0).toUpperCase() + feature.slice(1)}
                </span>
                <InfoTooltip content={`Enable/disable ${feature} functionality`} />
              </div>
              <button
                onClick={() => handleToggleFeature(feature)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  enabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Theme Settings */}
      <section className="bg-white rounded-lg shadow p-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Theme</h4>
        <div className="space-y-4">
          {Object.entries(localSettings.theme).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-sm text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="color"
                value={value}
                onChange={(e) => handleUpdateTheme(key, e.target.value)}
                className="h-8 w-14 rounded border border-gray-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Store Information */}
      <section className="bg-white rounded-lg shadow p-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Store Information</h4>
        <div className="space-y-4">
          {Object.entries(localSettings.store).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <label className="text-sm text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleUpdateStore(key, e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
      </section>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title="Reset Settings"
        message="Are you sure you want to reset all settings to their default values? This action cannot be undone."
      />
    </motion.div>
  );
}