import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';

export default function SortableComponent({ component, onVisibilityToggle }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-between bg-white p-4 rounded-lg shadow-sm ${
        isDragging ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center">
        <ArrowsUpDownIcon className="h-5 w-5 text-gray-400 mr-3" />
        <span className="font-medium">{component.name}</span>
      </div>
      <button
        onClick={() => onVisibilityToggle(component.id)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        {component.visible ? (
          <EyeIcon className="h-5 w-5" />
        ) : (
          <EyeSlashIcon className="h-5 w-5" />
        )}
      </button>
    </motion.div>
  );
}