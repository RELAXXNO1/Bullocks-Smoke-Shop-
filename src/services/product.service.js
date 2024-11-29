import { firestoreService } from './firestore.service';

export const productService = {
  async getProducts(category = null) {
    const conditions = category ? [
      { field: 'category', operator: '==', value: category }
    ] : [];
    
    const query = firestoreService.queryCollection('products', conditions, {
      field: 'createdAt',
      direction: 'desc'
    });
    
    const snapshot = await firestoreService.getDocs(query);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async addProduct(product) {
    return firestoreService.addDocData('products', {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  async updateProduct(id, product) {
    return firestoreService.updateDocData('products', id, {
      ...product,
      updatedAt: new Date()
    });
  },

  async deleteProduct(id) {
    return firestoreService.deleteDocData('products', id);
  }
};