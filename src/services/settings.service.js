import { firestoreService } from './firestore.service';

export const settingsService = {
  async getStoreSettings() {
    return firestoreService.getDocData('settings', 'store');
  },

  async saveStoreSettings(settings) {
    return firestoreService.setDocData('settings', 'store', settings);
  },

  async getStaticPageContent(pageId) {
    return firestoreService.getDocData('static_pages', pageId);
  },

  async saveStaticPageContent(pageId, content) {
    return firestoreService.setDocData('static_pages', pageId, {
      content,
      updatedAt: new Date()
    });
  }
};