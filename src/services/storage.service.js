import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import { authService } from './auth.service';

export const storageService = {
  uploadFile: async (file, path) => {
    try {
      // Ensure token is fresh before upload
      await authService.refreshToken();

      // Create storage reference with proper path structure
      const [category, ...rest] = path.split('/');
      const fullPath = `${category}/${rest.join('/')}`;
      const storageRef = ref(storage, fullPath);
      
      // Start upload
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      // Return promise that resolves with download URL
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            // Handle progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload progress:', progress);
          },
          (error) => {
            // Handle error
            console.error('Upload error:', error);
            reject(error);
          },
          async () => {
            // Handle success - get download URL
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      console.error('Upload preparation error:', error);
      throw error;
    }
  },
  
  getDownloadUrl: async (path) => {
    const storageRef = ref(storage, path);
    return getDownloadURL(storageRef);
  },

  deleteFile: async (path) => {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }
};