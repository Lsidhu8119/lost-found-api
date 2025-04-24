// src/services/claimService.ts
import { db } from '../config/firebase';

// Reference to the 'claims' collection
const claimCollection = db.collection('claims');

// Get all claims
export const getAll = async () => {
  const snapshot = await claimCollection.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Create a new claim
export const create = async (data: any) => {
  const docRef = await claimCollection.add(data);
  return { id: docRef.id, ...data };
};

// Update an existing claim
export const update = async (id: string, data: any) => {
  const claimRef = claimCollection.doc(id);
  const docSnapshot = await claimRef.get();

  if (!docSnapshot.exists) return null;

  await claimRef.update(data);
  return { id, ...data };
};

// Delete a claim
export const remove = async (id: string) => {
  const claimRef = claimCollection.doc(id);
  const docSnapshot = await claimRef.get();

  if (!docSnapshot.exists) return false;

  await claimRef.delete();
  return true;
};
