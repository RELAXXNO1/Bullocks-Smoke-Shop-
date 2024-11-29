import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function UserProfile() {
  const { currentUser, logout, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      toast.success('Successfully logged out');
    } catch (error) {
      toast.error('Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow rounded-lg p-6"
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage your account settings
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {currentUser?.email}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Account Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isAdmin ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Administrator
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Customer
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {loading ? 'Logging out...' : 'Log out'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default UserProfile;