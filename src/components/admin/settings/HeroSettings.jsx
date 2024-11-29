import PhotoSelector from '../PhotoSelector';

export default function HeroSettings({ settings, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background Image
        </label>
        <PhotoSelector
          value={settings.backgroundImage}
          onChange={(url) => handleChange('backgroundImage', url)}
          category="layout"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Heading
        </label>
        <input
          type="text"
          value={settings.heading || ''}
          onChange={(e) => handleChange('heading', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Welcome to our store"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subheading
        </label>
        <input
          type="text"
          value={settings.subheading || ''}
          onChange={(e) => handleChange('subheading', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Discover our products"
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
    </div>
  );
}