import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import { LocalPhotoBank } from '../../utils/localPhotoBank';
import { storageService } from '../../services/storage.service';
import { imageProcessor } from '../../utils/imageProcessor';
import toast from 'react-hot-toast';
import ConfirmDialog from './ConfirmDialog';

export default function PhotoSelector({ value = '', onChange, category = 'products' }) {
  const [photos, setPhotos] = useState([]);
  const [showPhotoBank, setShowPhotoBank] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const categoryPhotos = await LocalPhotoBank.getAllPhotos(category);
      setPhotos(categoryPhotos);
      setShowPhotoBank(true);
    } catch (error) {
      console.error('Error loading photos:', error);
      toast.error('Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoSelect = (photo) => {
    onChange(photo.url);
    setShowPhotoBank(false);
  };

  const handleDeletePhoto = async (photo) => {
    try {
      // Delete from Firebase Storage
      const urlParts = photo.url.split('/');
      const storagePath = urlParts[urlParts.length - 1];
      await storageService.deleteFile(`${category}/${storagePath}`);

      // Delete from LocalPhotoBank
      await LocalPhotoBank.deletePhoto(photo.id);

      // Update UI
      setPhotos(photos.filter(p => p.id !== photo.id));
      toast.success('Photo deleted successfully');

      // If this was the selected photo, clear it
      if (value === photo.url) {
        onChange('');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete photo');
    } finally {
      setPhotoToDelete(null);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      setUploading(true);
      
      // Process image (compress and auto-crop)
      const processedFile = await imageProcessor.processImage(file);
      
      // Upload to Firebase Storage
      const fileName = `${category}/${Date.now()}-${file.name}`;
      const downloadURL = await storageService.uploadFile(processedFile, fileName);
      
      // Save to local photo bank
      const savedPhoto = await LocalPhotoBank.savePhoto({
        name: file.name,
        url: downloadURL
      }, category);
      
      // Update photos list
      setPhotos([savedPhoto, ...photos]);
      
      // Update selected photo
      onChange(downloadURL);
      
      toast.success('Photo uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  }, []);

  return (
    <div 
      className="space-y-4"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Preview */}
      {value && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square"
        >
          <img
            src={value}
            alt="Selected"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
          >
            <XMarkIcon className="h-4 w-4 text-gray-500" />
          </button>
        </motion.div>
      )}

      {/* Photo Bank Button */}
      <button
        onClick={loadPhotos}
        disabled={uploading}
        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center"
      >
        <PhotoIcon className="h-5 w-5 mr-2" />
        {uploading ? 'Uploading...' : 'Select from Photo Bank'}
      </button>

      {/* Photo Bank Modal */}
      <AnimatePresence>
        {showPhotoBank && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-2xl w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Select Photo</h3>
                <button
                  onClick={() => setShowPhotoBank(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                </div>
              ) : photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {photos.map((photo) => (
                    <motion.div
                      key={photo.id}
                      className="relative aspect-square group"
                    >
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                        onClick={() => handlePhotoSelect(photo)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handlePhotoSelect(photo)}
                            className="p-2 bg-white rounded-full hover:bg-gray-100"
                          >
                            <PhotoIcon className="h-4 w-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => setPhotoToDelete(photo)}
                            className="p-2 bg-white rounded-full hover:bg-gray-100"
                          >
                            <TrashIcon className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-500">No photos available</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!photoToDelete}
        onClose={() => setPhotoToDelete(null)}
        onConfirm={() => handleDeletePhoto(photoToDelete)}
        title="Delete Photo"
        message="Are you sure you want to delete this photo? This action cannot be undone."
        type="danger"
        confirmText="Delete"
      />
    </div>
  );
}