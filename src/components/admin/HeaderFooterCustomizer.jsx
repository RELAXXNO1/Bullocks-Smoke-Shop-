import { useState } from 'react';
import { motion } from 'framer-motion';
import PhotoSelector from './PhotoSelector';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function HeaderFooterCustomizer({ type, settings, onChange }) {
  const [activeTab, setActiveTab] = useState('general');

  const editor = useEditor({
    extensions: [StarterKit],
    content: settings?.announcement || '',
    onUpdate: ({ editor }) => {
      handleSettingChange('announcement', editor.getHTML());
    }
  });

  const handleSettingChange = (key, value) => {
    onChange({
      ...settings,
      [key]: value
    });
  };

  const handleNavigationChange = (index, key, value) => {
    const newNavigation = [...(settings.navigation || [])];
    newNavigation[index] = {
      ...newNavigation[index],
      [key]: value
    };
    handleSettingChange('navigation', newNavigation);
  };

  const addNavigationItem = () => {
    handleSettingChange('navigation', [
      ...(settings.navigation || []),
      { label: 'New Link', href: '#' }
    ]);
  };

  const removeNavigationItem = (index) => {
    const newNavigation = [...(settings.navigation || [])];
    newNavigation.splice(index, 1);
    handleSettingChange('navigation', newNavigation);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo
        </label>
        <PhotoSelector
          value={settings?.logo || ''}
          onChange={(url) => handleSettingChange('logo', url)}
          category={`layout-${type}`}
        />
      </div>

      {type === 'header' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Announcement Bar
          </label>
          <EditorContent editor={editor} />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <input
          type="color"
          value={settings?.backgroundColor || '#1F2937'}
          onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
          className="block w-full h-10 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Color
        </label>
        <input
          type="color"
          value={settings?.textColor || '#FFFFFF'}
          onChange={(e) => handleSettingChange('textColor', e.target.value)}
          className="block w-full h-10 rounded-md"
        />
      </div>
    </div>
  );

  const renderNavigationSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-gray-700">Navigation Links</h4>
        <button
          onClick={addNavigationItem}
          className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Link
        </button>
      </div>

      <div className="space-y-4">
        {(settings?.navigation || []).map((item, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={item.label}
                onChange={(e) => handleNavigationChange(index, 'label', e.target.value)}
                placeholder="Link Label"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                value={item.href}
                onChange={(e) => handleNavigationChange(index, 'href', e.target.value)}
                placeholder="Link URL"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => removeNavigationItem(index)}
              className="p-2 text-red-600 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('general')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'general'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('navigation')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'navigation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Navigation
          </button>
        </nav>
      </div>

      <div>
        {activeTab === 'general' && renderGeneralSettings()}
        {activeTab === 'navigation' && renderNavigationSettings()}
      </div>
    </div>
  );
}