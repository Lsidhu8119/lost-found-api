import admin from 'firebase-admin';
import serviceAccount from '../../../../lost_found_api.json';

// Initialize Firebase Admin SDK only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

// ✅ Export the authentication and Firestore database instances
export const auth = admin.auth();
export const db = admin.firestore();