import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

// Initialize localForage instance for photos
const photoBank = localforage.createInstance({
  name: 'photoBank',
  storeName: 'photos'
});

// Initialize localForage instance for metadata
const metadataBank = localforage.createInstance({
  name: 'photoBank',
  storeName: 'metadata'
});

export const LocalPhotoBank = {
  async savePhoto({ url, name }, category = 'general') {
    try {
      const id = uuidv4();
      const metadata = {
        id,
        name,
        url,
        category,
        createdAt: new Date().toISOString(),
        lastUsed: new Date().toISOString()
      };

      // Store the metadata
      await metadataBank.setItem(id, metadata);

      return metadata;
    } catch (error) {
      console.error('Error saving to photo bank:', error);
      throw error;
    }
  },

  async getAllPhotos(category = null) {
    try {
      const photos = [];
      await metadataBank.iterate((metadata) => {
        if (!category || metadata.category === category) {
          photos.push(metadata);
        }
      });

      // Sort by last used, most recent first
      return photos.sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed));
    } catch (error) {
      console.error('Error retrieving all photos:', error);
      throw error;
    }
  },

  async deletePhoto(id) {
    try {
      // Get metadata first to get the URL
      const metadata = await metadataBank.getItem(id);
      if (!metadata) {
        throw new Error('Photo not found');
      }

      // Remove from metadata storage
      await metadataBank.removeItem(id);

      return metadata;
    } catch (error) {
      console.error('Error deleting from photo bank:', error);
      throw error;
    }
  },

  async updateLastUsed(id) {
    try {
      const metadata = await metadataBank.getItem(id);
      if (metadata) {
        metadata.lastUsed = new Date().toISOString();
        await metadataBank.setItem(id, metadata);
      }
    } catch (error) {
      console.error('Error updating last used:', error);
    }
  },

  async clear() {
    try {
      await metadataBank.clear();
    } catch (error) {
      console.error('Error clearing photo bank:', error);
      throw error;
    }
  }
};