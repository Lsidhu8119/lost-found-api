import { db } from '../config/firebase';
import { v4 as uuid } from 'uuid';

const collection = db.collection('lost-items');

// Get all lost items
export const getAll = async () => {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Create a new lost item
export const create = async (data: any) => {
  const newItem = { ...data, id: uuid() };
  await collection.doc(newItem.id).set(newItem);
  return newItem;
};

// Update an existing lost item
export const update = async (id: string, data: any) => {
  const docRef = collection.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return null;
  }
  await docRef.update(data);
  return { id, ...data };
};

// Delete a lost item
export const remove = async (id: string) => {
  const docRef = collection.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return false;
  }
  await docRef.delete();
  return true;
};
