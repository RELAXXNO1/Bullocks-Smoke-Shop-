import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Compliance', href: '/compliance' }
  ],
  categories: [
    { name: 'THCA Flower', href: '/thca-flower' },
    { name: 'Disposables', href: '/disposables' },
    { name: 'Edibles', href: '/edibles' },
    { name: 'Mushrooms', href: '/mushrooms' },
    { name: 'CBD', href: '/cbd' },
    { name: 'Kratom', href: '/kratom' }
  ],
  social: [
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'Twitter', href: '#', icon: 'twitter' }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          {navigation.main.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2"
            >
              <Link
                to={item.href}
                className="text-base text-gray-400 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>
        
        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Bullocks Smoke Shop. All rights reserved.
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            Must be 21 or older to purchase. Please consume responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}