import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { FolderIcon, PhotoIcon } from '@heroicons/react/24/outline';
import PhotoSelector from './PhotoSelector';
import { LocalPhotoBank } from '../../utils/localPhotoBank';
import toast from 'react-hot-toast';

const categories = [
  { id: 'products', name: 'Products', subcategories: [
    'thca-flower',
    'disposables',
    'edibles',
    'mushrooms',
    'cbd',
    'kratom'
  ]},
  { id: 'layout', name: 'Layout', subcategories: [
    'hero',
    'banners',
    'backgrounds'
  ]},
  { id: 'marketing', name: 'Marketing', subcategories: [
    'promotions',
    'announcements',
    'social-media'
  ]}
];

export default function PhotoBank() {
  const [showDialog, setShowDialog] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [photos, setPhotos] = useState([]);

  const handleCategorySelect = async (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setShowDialog(false);

    try {
      const categoryPhotos = await LocalPhotoBank.getAllPhotos(`${category}-${subcategory}`);
      setPhotos(categoryPhotos);
    } catch (error) {
      console.error('Error loading photos:', error);
      toast.error('Failed to load photos');
    }
  };

  const handlePhotoUpload = async (url) => {
    try {
      await LocalPhotoBank.savePhoto(url, `${selectedCategory}-${selectedSubcategory}`);
      const updatedPhotos = await LocalPhotoBank.getAllPhotos(`${selectedCategory}-${selectedSubcategory}`);
      setPhotos(updatedPhotos);
      toast.success('Photo uploaded successfully');
    } catch (error) {
      console.error('Error saving photo:', error);
      toast.error('Failed to save photo');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Photo Bank</h2>
          {selectedCategory && (
            <p className="text-sm text-gray-500 mt-1">
              Category: {selectedCategory} / {selectedSubcategory}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowDialog(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Change Category
        </button>
      </div>

      {selectedCategory && (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Photos</h3>
            <PhotoSelector
              value={[]}
              onChange={handlePhotoUpload}
              multiple={true}
              category={`${selectedCategory}-${selectedSubcategory}`}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Photo Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="aspect-square relative group"
                >
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {/* Copy URL */}}
                        className="px-3 py-1 bg-white text-gray-900 rounded-md text-sm hover:bg-gray-100"
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showDialog && (
          <Dialog
            as={motion.div}
            static
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            open={showDialog}
            onClose={() => selectedCategory && setShowDialog(false)}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen">
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 p-6"
              >
                <Dialog.Title as="h3" className="text-lg font-medium text-gray-900 mb-4">
                  Select Photo Category
                </Dialog.Title>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <h4 className="font-medium text-gray-700 flex items-center">
                        <FolderIcon className="h-5 w-5 mr-2" />
                        {category.name}
                      </h4>
                      <div className="space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <button
                            key={subcategory}
                            onClick={() => handleCategorySelect(category.id, subcategory)}
                            className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                          >
                            <PhotoIcon className="h-4 w-4 mr-2" />
                            {subcategory.split('-').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}