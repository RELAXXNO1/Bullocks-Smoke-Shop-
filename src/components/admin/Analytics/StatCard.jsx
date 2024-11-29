import { motion } from 'framer-motion';
import { 
  UsersIcon, 
  ShoppingCartIcon, 
  CursorArrowRaysIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const icons = {
  users: UsersIcon,
  cart: ShoppingCartIcon,
  cursor: CursorArrowRaysIcon,
  chart: ChartBarIcon
};

export default function StatCard({ stat, index }) {
  const Icon = icons[stat.icon] || ChartBarIcon;

  const getChangeColor = (changeType) => {
    return changeType === 'increase' 
      ? 'text-green-600' 
      : changeType === 'decrease'
      ? 'text-red-600'
      : 'text-gray-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
    >
      <dt>
        <div className="absolute rounded-md bg-blue-500 p-3">
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <p className="ml-16 truncate text-sm font-medium text-gray-500">
          {stat.name}
        </p>
      </dt>
      <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">{stat.stat}</p>
        <p className={`ml-2 flex items-baseline text-sm font-semibold ${getChangeColor(stat.changeType)}`}>
          {stat.change}
        </p>
        {stat.info && (
          <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                View details
              </a>
            </div>
          </div>
        )}
      </dd>
    </motion.div>
  );
}