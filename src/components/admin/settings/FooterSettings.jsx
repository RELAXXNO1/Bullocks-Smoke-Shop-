import PhotoSelector from '../PhotoSelector';

export default function FooterSettings({ settings, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Footer Logo
        </label>
        <PhotoSelector
          value={settings.logo}
          onChange={(url) => handleChange('logo', url)}
          category="layout"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <input
          type="color"
          value={settings.backgroundColor || '#1F2937'}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
          className="block w-full h-10 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Color
        </label>
        <input
          type="color"
          value={settings.textColor || '#FFFFFF'}
          onChange={(e) => handleChange('textColor', e.target.value)}
          className="block w-full h-10 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Copyright Text
        </label>
        <input
          type="text"
          value={settings.copyrightText || ''}
          onChange={(e) => handleChange('copyrightText', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="© 2024 Your Store. All rights reserved."
        />
      </div>
    </div>
  );
}