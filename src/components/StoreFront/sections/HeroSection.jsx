import { motion } from 'framer-motion';

function HeroSection({ layout }) {
  const heroSettings = layout?.components?.find(c => c.id === 'hero')?.settings || {};
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gray-900 h-[70vh]"
    >
      <div className="absolute inset-0 overflow-hidden">
        {heroSettings.backgroundImage && (
          <img
            src={heroSettings.backgroundImage}
            alt="Hero background"
            className="w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6"
          dangerouslySetInnerHTML={{ __html: heroSettings.heading || 'Premium Smoke Shop' }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: heroSettings.subheading || 'Discover our curated collection of premium products' }}
        />
      </div>
    </motion.div>
  );
}

export default HeroSection;