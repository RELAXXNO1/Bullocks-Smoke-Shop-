import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const defaultContent = {
  about: 'Welcome to our store! We are committed to providing quality products and excellent service.',
  privacy: 'Your privacy is important to us. This privacy policy outlines how we collect and use your data.',
  terms: 'Please read these terms and conditions carefully before using our services.',
  contact: 'Get in touch with us! We\'d love to hear from you.'
};

export const useStaticContent = (pageId) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initializeContent = async () => {
    try {
      const contentRef = doc(db, 'static_pages', pageId);
      await setDoc(contentRef, {
        content: defaultContent[pageId] || '',
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('Error initializing content:', error);
      setError(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'static_pages', pageId),
      (doc) => {
        if (doc.exists()) {
          setContent(doc.data().content);
        } else {
          // If document doesn't exist, create it with default content
          initializeContent();
          setContent(defaultContent[pageId] || '');
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching content:', error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [pageId]);

  return { content, loading, error };
};