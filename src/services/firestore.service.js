import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';

export const firestoreService = {
  // Collection operations
  getCollection: (collectionName) => collection(db, collectionName),
  
  // Document operations
  getDocument: (collectionName, docId) => doc(db, collectionName, docId),
  
  // Read operations
  getDocData: async (collectionName, docId) => {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },
  
  // Write operations
  setDocData: (collectionName, docId, data) => 
    setDoc(doc(db, collectionName, docId), data),
    
  addDocData: (collectionName, data) => 
    addDoc(collection(db, collectionName), data),
    
  updateDocData: (collectionName, docId, data) => 
    updateDoc(doc(db, collectionName, docId), data),
    
  deleteDocData: (collectionName, docId) => 
    deleteDoc(doc(db, collectionName, docId)),
  
  // Query operations
  queryCollection: (collectionName, conditions = [], sortBy = null) => {
    const collectionRef = collection(db, collectionName);
    const queryConstraints = [
      ...conditions.map(({ field, operator, value }) => 
        where(field, operator, value)
      ),
      ...(sortBy ? [orderBy(sortBy.field, sortBy.direction)] : [])
    ];
    return query(collectionRef, ...queryConstraints);
  }
};