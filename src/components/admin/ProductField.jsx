import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import InfoTooltip from './InfoTooltip';
import { motion } from 'framer-motion';
import PhotoSelector from './PhotoSelector';

export default function ProductField({ field, value, onChange }) {
  const renderMultiSelect = () => (
    <div className="mt-1 relative">
      <div className="flex flex-wrap gap-2 mb-2">
        {field.options.map(option => {
          const optionId = typeof option === 'object' ? option.id : option;
          const isSelected = Array.isArray(value) && value.includes(optionId);
          const label = typeof option === 'object' ? option.name : option;
          
          return (
            <button
              key={optionId}
              type="button"
              onClick={() => {
                const newValue = Array.isArray(value) ? [...value] : [];
                if (isSelected) {
                  onChange(newValue.filter(id => id !== optionId));
                } else {
                  onChange([...newValue, optionId]);
                }
              }}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                ${isSelected 
                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {label}
              {typeof option === 'object' && option.description && (
                <InfoTooltip content={option.description} />
              )}
            </button>
          );
        })}
      </div>
      {Array.isArray(value) && value.length > 0 && (
        <div className="text-sm text-gray-500 mt-2">
          Selected: {value.length} item{value.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );

  const renderPhotoField = () => (
    <PhotoSelector
      value={value}
      onChange={onChange}
      multiple={field.multiple}
      category={field.category}
    />
  );

  const renderField = () => {
    switch (field.type) {
      case 'multiselect':
        return renderMultiSelect();
      
      case 'photos':
        return renderPhotoField();
      
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        );
      
      case 'boolean':
        return (
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={value || false}
                onChange={(e) => onChange(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="ml-2 text-sm text-gray-600">
                {field.checkboxLabel || 'Yes'}
              </span>
            </label>
          </div>
        );
      
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select {field.label}</option>
            {field.options.map(option => (
              <option 
                key={typeof option === 'object' ? option.id : option} 
                value={typeof option === 'object' ? option.id : option}
              >
                {typeof option === 'object' ? option.name : option}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            type={field.type}
            step={field.step}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        );
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-1">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
        </label>
        {field.tooltip && (
          <InfoTooltip content={field.tooltip} />
        )}
      </div>
      {field.description && (
        <p className="mt-1 text-sm text-gray-500">{field.description}</p>
      )}
      {renderField()}
    </div>
  );
}