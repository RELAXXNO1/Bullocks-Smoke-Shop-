import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ImageCrop({ image, onComplete, onCancel, aspect = 1 }) {
  const [crop, setCrop] = useState({
    unit: '%',
    width: 90,
    aspect
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [imgRef, setImgRef] = useState(null);

  const onLoad = (img) => {
    setImgRef(img);
  };

  const createCroppedImage = async () => {
    if (!completedCrop || !imgRef) {
      onCancel();
      return;
    }

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.naturalWidth / imgRef.width;
    const scaleY = imgRef.naturalHeight / imgRef.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      imgRef,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('Canvas is empty');
        onCancel();
        return;
      }
      blob.name = image.name;
      onComplete(blob);
    }, 'image/jpeg', 0.95);
  };

  return (
    <Dialog open={true} onClose={onCancel} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

        <div className="relative bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
          <div className="absolute right-4 top-4">
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <Dialog.Title className="text-lg font-medium mb-4">
            Crop Image
          </Dialog.Title>

          <div className="max-h-[60vh] overflow-auto">
            <ReactCrop
              crop={crop}
              onChange={c => setCrop(c)}
              onComplete={c => setCompletedCrop(c)}
              aspect={aspect}
            >
              <img
                src={URL.createObjectURL(image)}
                onLoad={e => onLoad(e.currentTarget)}
                className="max-w-full"
                alt="Crop preview"
              />
            </ReactCrop>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={createCroppedImage}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Apply Crop
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}