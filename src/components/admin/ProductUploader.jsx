import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { read, utils } from 'xlsx';
import { collection, addDoc, writeBatch, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

function ProductUploader() {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const processFile = async (file) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);
      
      setPreview({
        headers: Object.keys(jsonData[0]),
        sample: jsonData.slice(0, 3),
        total: jsonData.length,
        data: jsonData
      });
    } catch (error) {
      toast.error('Error processing file');
      console.error('Error processing file:', error);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    multiple: false
  });

  const uploadProducts = async () => {
    if (!preview?.data) return;

    setUploading(true);
    const uploadToast = toast.loading('Uploading products...');

    try {
      const batch = writeBatch(db);
      const productsRef = collection(db, 'products');

      preview.data.forEach((product) => {
        const docRef = doc(productsRef);
        batch.set(docRef, {
          ...product,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });

      await batch.commit();
      toast.success(`Successfully uploaded ${preview.data.length} products`, {
        id: uploadToast,
      });
      setPreview(null);
    } catch (error) {
      toast.error('Error uploading products: ' + error.message, {
        id: uploadToast,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Product Uploader</h2>
          <p className="mt-2 text-gray-600">Upload your product data in Excel or CSV format</p>
        </div>

        <div
          {...getRootProps()}
          className={`mt-4 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          <input {...getInputProps()} />
          <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive ? 'Drop the file here' : 'Drag & drop a file here, or click to select'}
          </p>
        </div>

        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900">Preview</h3>
              <p className="text-sm text-gray-600">Total products: {preview.total}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {preview.headers.map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {preview.sample.map((row, idx) => (
                    <tr key={idx}>
                      {preview.headers.map((header) => (
                        <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setPreview(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={uploadProducts}
                disabled={uploading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Products'}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ProductUploader;