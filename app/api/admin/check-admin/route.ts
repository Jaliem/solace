import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ message: "Missing ID token" }, { status: 400 });
    }

    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (error) {
      console.error("Error verifying ID token:", error);
      return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
    }

    const userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();

    if (!userDoc.exists || !userDoc.data()?.isAdmin) {
      return NextResponse.json({ message: "Forbidden: Not an admin" }, { status: 403 });
    }

    return NextResponse.json({ message: "Authorized: Admin user" }, { status: 200 });
  } catch (error: any) {
    console.error("Error checking admin status:", error);
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
  }
}
