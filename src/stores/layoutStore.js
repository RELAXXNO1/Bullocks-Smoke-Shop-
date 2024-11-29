import { create } from 'zustand';
import { layoutService } from '../services/layout.service';

const defaultLayout = {
  components: [
    { id: 'header', name: 'Header', visible: true, order: 0 },
    { id: 'hero', name: 'Hero Banner', visible: true, order: 1 },
    { id: 'categories', name: 'Categories Grid', visible: true, order: 2 },
    { id: 'featured', name: 'Featured Products', visible: true, order: 3 },
    { id: 'footer', name: 'Footer', visible: true, order: 4 }
  ],
  theme: {
    primaryColor: '#3B82F6',
    backgroundColor: '#F3F4F6'
  }
};

const useLayoutStore = create((set, get) => ({
  layout: defaultLayout,
  selectedComponent: null,
  loading: true,
  error: null,
  previewMode: 'desktop',

  setLayout: (layout) => set({ layout }),
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  setPreviewMode: (mode) => set({ previewMode: mode }),

  fetchLayout: async () => {
    try {
      set({ loading: true, error: null });
      const layout = await layoutService.getLayout();
      set({ layout: layout || defaultLayout, loading: false });
    } catch (error) {
      console.error('Failed to load layout:', error);
      set({ 
        layout: defaultLayout, 
        error: 'Failed to load layout', 
        loading: false 
      });
    }
  },

  updateComponent: async (componentId, settings) => {
    const { layout } = get();
    if (!layout?.components) return;

    const updatedComponents = layout.components.map(comp =>
      comp.id === componentId ? { ...comp, settings } : comp
    );

    const updatedLayout = { ...layout, components: updatedComponents };
    set({ layout: updatedLayout });

    try {
      await layoutService.saveLayout(updatedLayout);
    } catch (error) {
      console.error('Failed to save layout:', error);
    }
  },

  updateComponentOrder: async (components) => {
    const { layout } = get();
    if (!layout?.components) return;

    const updatedLayout = { ...layout, components };
    set({ layout: updatedLayout });

    try {
      await layoutService.saveLayout(updatedLayout);
    } catch (error) {
      console.error('Failed to save layout order:', error);
    }
  },

  toggleComponentVisibility: async (componentId) => {
    const { layout } = get();
    if (!layout?.components) return;

    const updatedComponents = layout.components.map(comp =>
      comp.id === componentId ? { ...comp, visible: !comp.visible } : comp
    );

    const updatedLayout = { ...layout, components: updatedComponents };
    set({ layout: updatedLayout });

    try {
      await layoutService.saveLayout(updatedLayout);
    } catch (error) {
      console.error('Failed to toggle visibility:', error);
    }
  }
}));

export default useLayoutStore;