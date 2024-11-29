import PhotoSelector from '../PhotoSelector';

export default function HeaderSettings({ settings, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...settings, [key]: value });
  };

  const handleHoursChange = (day, value) => {
    const updatedHours = {
      ...(settings.hours || {}),
      [day]: value
    };
    handleChange('hours', updatedHours);
  };

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo
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
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.showSearch}
            onChange={(e) => handleChange('showSearch', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Show Search Bar</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Store Hours
        </label>
        <div className="space-y-3">
          {days.map(day => (
            <div key={day} className="flex items-center space-x-3">
              <span className="w-24 text-sm text-gray-600">{day}</span>
              <input
                type="text"
                value={settings.hours?.[day] || '8AM-11PM'}
                onChange={(e) => handleHoursChange(day, e.target.value)}
                placeholder="e.g., 8AM-11PM"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}