import { Fragment, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon,
  ShoppingBagIcon,
  PhoneIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useStoreSettings } from '../../hooks/useStoreSettings';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import HoursPopup from '../HoursPopup';

const navigation = [
  { name: 'THCA Flower', href: '/thca-flower' },
  { name: 'Disposables', href: '/disposables' },
  { name: 'Edibles', href: '/edibles' },
  { name: 'Mushrooms', href: '/mushrooms' },
  { name: 'CBD', href: '/cbd' },
  { name: 'Kratom', href: '/kratom' },
  { name: 'Zero Nic', href: '/zero-nic' },
  { name: 'Accessories', href: '/accessories' }
];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdmin, logout } = useAuth();
  const { settings } = useStoreSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHoursPopup, setShowHoursPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast.success('Successfully logged out');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <>
      <Disclosure as="nav" className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-gray-900'
      }`}>
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link to="/" className="flex-shrink-0 flex items-center">
                    <motion.span 
                      className="text-white text-xl font-bold"
                      whileHover={{ scale: 1.05 }}
                    >
                      Bullocks Smoke Shop
                    </motion.span>
                  </Link>
                  <div className="hidden lg:flex lg:items-center lg:ml-8">
                    <a href="tel:+17408306002" className="flex items-center text-gray-300 hover:text-white transition-colors">
                      <PhoneIcon className="h-5 w-5 mr-2" />
                      <span>(740) 830-6002</span>
                    </a>
                    <button
                      onClick={() => setShowHoursPopup(true)}
                      className="ml-6 text-gray-300 hover:text-white transition-colors flex items-center"
                    >
                      <ClockIcon className="h-5 w-5 mr-2" />
                      <span>Hours</span>
                    </button>
                  </div>
                </div>

                <div className="hidden lg:flex lg:items-center lg:space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === item.href
                          ? 'text-white bg-gray-800'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  {settings?.features?.cart && (
                    <Link
                      to="/cart"
                      className="p-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <ShoppingBagIcon className="h-6 w-6" />
                    </Link>
                  )}

                  {currentUser ? (
                    <Menu as="div" className="relative ml-3">
                      <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white">
                        <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-white" />
                        </div>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={`block px-4 py-2 text-sm ${
                                  active ? 'bg-gray-100' : ''
                                }`}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          {isAdmin && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/admin"
                                  className={`block px-4 py-2 text-sm ${
                                    active ? 'bg-gray-100' : ''
                                  }`}
                                >
                                  Admin Panel
                                </Link>
                              )}
                            </Menu.Item>
                          )}
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={`block w-full text-left px-4 py-2 text-sm ${
                                  active ? 'bg-gray-100' : ''
                                }`}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link
                      to="/login"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Sign in
                    </Link>
                  )}

                  <div className="flex items-center lg:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <div className="px-3 py-2 text-gray-300 text-sm">
                  <a href="tel:+17408306002" className="flex items-center text-gray-300 hover:text-white mb-2">
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    <span>(740) 830-6002</span>
                  </a>
                  <button
                    onClick={() => setShowHoursPopup(true)}
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    <ClockIcon className="h-5 w-5 mr-2" />
                    <span>Hours</span>
                  </button>
                </div>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.href
                        ? 'text-white bg-gray-800'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <HoursPopup
        isOpen={showHoursPopup}
        onClose={() => setShowHoursPopup(false)}
        hours={settings?.header?.hours}
      />
    </>
  );
}

export default Header;