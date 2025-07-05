import * as admin from "firebase-admin";

// Check if the environment variable is set.
// This guard clause satisfies TypeScript and prevents runtime errors.
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  // Use a more specific error message in a real app
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
}

// If the code reaches here, TypeScript knows the variable is a string.
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// Initialize the app only once to prevent errors during hot-reloads
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();