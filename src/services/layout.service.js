import { firestoreService } from './firestore.service';

export const layoutService = {
  async getLayout() {
    return firestoreService.getDocData('settings', 'layout');
  },

  async saveLayout(layout) {
    return firestoreService.setDocData('settings', 'layout', layout);
  },

  async updateComponent(componentId, settings) {
    const layout = await this.getLayout();
    const updatedComponents = layout.components.map(comp =>
      comp.id === componentId ? { ...comp, settings } : comp
    );
    
    return this.saveLayout({
      ...layout,
      components: updatedComponents
    });
  }
};