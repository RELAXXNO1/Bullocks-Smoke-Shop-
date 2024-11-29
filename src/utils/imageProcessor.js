import Compressor from 'compressorjs';

export const imageProcessor = {
  processImage: async (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8,
        maxWidth: 1920,
        maxHeight: 1920,
        convertSize: 1000000, // Convert to JPEG if larger than ~1MB
        success: (compressedFile) => {
          resolve(compressedFile);
        },
        error: (err) => {
          console.error('Image compression error:', err);
          reject(err);
        }
      });
    });
  }
};