import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const { idToken, professionalData } = await request.json();

    if (!idToken || !professionalData) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Verify the ID token to ensure the user is authenticated
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (error) {
      console.error("Error verifying ID token:", error);
      return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // TODO: Implement more robust authorization check here (e.g., check if decodedToken.uid corresponds to an admin user)
    // For example, you might fetch the user's profile from adminDb.collection('users').doc(decodedToken.uid) and check an 'isAdmin' field.

    // Add the professional data to Firestore
    await adminDb.collection("professionals").add({
      ...professionalData,
      createdAt: new Date().toISOString(),
      addedBy: decodedToken.uid, // Record who added the professional
    });

    return NextResponse.json({ message: "Professional added successfully!" }, { status: 201 });
  } catch (error: any) {
    console.error("Error adding professional:", error);
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
  }
}