import { useState, useEffect, useRef, useCallback } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InfoTooltip from './InfoTooltip';
import ConfirmDialog from './ConfirmDialog';
import { STATIC_PAGES } from '../../constants/staticPages';

export default function StaticPageEditor() {
  const [selectedPage, setSelectedPage] = useState(STATIC_PAGES[0]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const quillRef = useRef();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    let unsubscribe = () => {};

    if (isOnline) {
      unsubscribe = onSnapshot(
        doc(db, 'static_pages', selectedPage.id),
        (doc) => {
          if (doc.exists()) {
            setContent(doc.data().content);
          }
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching content:', error);
          toast.error('Failed to load content');
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
      toast.error('You are offline. Some features may be limited.');
    }

    return () => unsubscribe();
  }, [selectedPage, isOnline]);

  const handleSave = async () => {
    if (!isOnline) {
      toast.error('Cannot save while offline');
      return;
    }

    setSaving(true);
    try {
      await setDoc(doc(db, 'static_pages', selectedPage.id), {
        content,
        updatedAt: new Date()
      });
      toast.success('Page content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!isOnline) {
      toast.error('Cannot reset while offline');
      return;
    }

    try {
      const defaultContent = await import(`../../data/default/${selectedPage.id}.js`);
      setContent(defaultContent.default);
      toast.success('Content reset to default');
    } catch (error) {
      console.error('Error resetting content:', error);
      toast.error('Failed to reset content');
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        ['link', 'image'],
        ['clean']
      ]
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'link', 'image'
  ];

  const handleEditorChange = useCallback((value) => {
    setContent(value);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={selectedPage.id}
            onChange={(e) => {
              const page = STATIC_PAGES.find(p => p.id === e.target.value);
              setSelectedPage(page);
            }}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {STATIC_PAGES.map(page => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>
          <InfoTooltip content="Edit your website's static pages content" />
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowResetConfirm(true)}
            disabled={!isOnline}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !isOnline}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow"
      >
        <div className="h-[500px] relative">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={handleEditorChange}
            modules={modules}
            formats={formats}
            className="h-full"
            preserveWhitespace
          />
        </div>
      </motion.div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title="Reset Content"
        message="Are you sure you want to reset this page's content to its default? This action cannot be undone."
        type="warning"
      />
    </div>
  );
}