import { useEffect } from 'react';
import { useStaticContent } from '../../hooks/useStaticContent';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { motion } from 'framer-motion';

export default function Privacy() {
  const { content, loading, error } = useStaticContent('privacy');

  useEffect(() => {
    document.title = 'Privacy Policy | Bullocks Smoke Shop';
  }, []);

  if (loading) {
    return <LoadingSkeleton type="content" count={3} />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load content</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div 
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </motion.div>
  );
}