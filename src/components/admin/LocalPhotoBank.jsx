import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocalPhotoBank } from '../../utils/localPhotoBank';
import { XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function LocalPhotoBankViewer({ onSelect, category = 'general' }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, [category]);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const loadedPhotos = await LocalPhotoBank.getAllPhotos(category);
      setPhotos(loadedPhotos);
    } catch (error) {
      toast.error('Failed to load local photos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await LocalPhotoBank.deletePhoto(id);
      setPhotos(photos.filter(photo => photo.id !== id));
      toast.success('Photo removed from local storage');
    } catch (error) {
      toast.error('Failed to delete photo');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Local Photo Bank</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group aspect-square"
            >
              <img
                src={photo.url}
                alt={photo.name}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => onSelect(photo)}
                onError={() => {
                  handleDelete(photo.id);
                  toast.error('Failed to load photo');
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg" />
              <button
                onClick={() => handleDelete(photo.id)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110"
              >
                <XMarkIcon className="h-4 w-4 text-gray-500" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {photos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">No local photos available</p>
        </div>
      )}
    </div>
  );
}