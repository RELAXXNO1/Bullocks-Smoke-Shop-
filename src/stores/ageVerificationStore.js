import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAgeVerificationStore = create(
  persist(
    (set) => ({
      isVerified: false,
      setVerified: (value) => set({ isVerified: value }),
      reset: () => set({ isVerified: false })
    }),
    {
      name: 'age-verification',
      getStorage: () => localStorage
    }
  )
);

export default useAgeVerificationStore;