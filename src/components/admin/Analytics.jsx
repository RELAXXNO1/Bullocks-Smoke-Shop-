import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnalytics } from '../../hooks/useAnalytics';
import VisitorChart from './Analytics/VisitorChart';
import StatCard from './Analytics/StatCard';
import CategoryDistribution from './Analytics/CategoryDistribution';
import PopularProducts from './Analytics/PopularProducts';
import { 
  UsersIcon, 
  ShoppingCartIcon, 
  CursorArrowRaysIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('week');
  const { stats, visitorData, categoryData, popularProducts, loading, error } = useAnalytics(timeRange);

  useEffect(() => {
    document.title = 'Analytics | Admin Dashboard';
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        {/* Skeleton loading state */}
        <div className="flex justify-end">
          <div className="w-32 h-10 bg-gray-200 rounded animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-5 shadow animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-5 shadow animate-pulse">
          <div className="h-64 bg-gray-200 rounded" />
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
              <h3 className="text-sm font-medium text-red-800">Error loading analytics data</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error.message || 'Please try again later or contact support if the problem persists.'}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {stats?.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} />
        ))}
      </motion.div>

      {/* Traffic Overview */}
      {visitorData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VisitorChart data={visitorData} />
        </motion.div>
      )}

      {/* Category Distribution and Popular Products */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {categoryData && <CategoryDistribution data={categoryData} />}
        {popularProducts && <PopularProducts data={popularProducts} />}
      </motion.div>
    </div>
  );
}