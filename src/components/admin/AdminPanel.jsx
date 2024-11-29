import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  ChartBarIcon,
  Squares2X2Icon,
  ArrowUpTrayIcon,
  PaintBrushIcon,
  Cog6ToothIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

import Analytics from './Analytics';
import ProductManager from './ProductManager';
import ProductUploader from './ProductUploader';
import LayoutEditor from './LayoutEditor';
import StoreSettings from './StoreSettings';
import PhotoBank from './PhotoBank';
import ErrorBoundary from '../ErrorBoundary';

const tabs = [
  { name: 'Analytics', icon: ChartBarIcon, component: Analytics },
  { name: 'Product Manager', icon: Squares2X2Icon, component: ProductManager },
  { name: 'Bulk Upload', icon: ArrowUpTrayIcon, component: ProductUploader },
  { name: 'Layout Editor', icon: PaintBrushIcon, component: LayoutEditor },
  { name: 'Store Settings', icon: Cog6ToothIcon, component: StoreSettings },
  { name: 'Photo Bank', icon: PhotoIcon, component: PhotoBank }
];

export default function AdminPanel() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    // Set document title
    document.title = 'Admin Dashboard | Bullocks Smoke Shop';
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Logged in as {currentUser?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
            <Tab.List className="flex space-x-1 bg-blue-50/50 p-1">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all flex items-center justify-center
                    ${
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-gray-600 hover:bg-white/[0.5] hover:text-blue-600'
                    }`
                  }
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {tabs.map((tab, idx) => (
                <Tab.Panel
                  key={idx}
                  className="rounded-xl bg-white p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                >
                  <ErrorBoundary>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <tab.component />
                    </motion.div>
                  </ErrorBoundary>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}