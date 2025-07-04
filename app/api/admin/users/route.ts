import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (error) {
      console.error("Error verifying ID token:", error);
      return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // Check if the user is an admin
    const userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();
    if (!userDoc.exists || userDoc.data()?.userType !== "admin") {
      return NextResponse.json({ message: "Forbidden: Not an admin" }, { status: 403 });
    }

    const usersSnapshot = await adminDb.collection("users").get();
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ users }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (error) {
      console.error("Error verifying ID token:", error);
      return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // Check if the user is an admin
    const adminUserDoc = await adminDb.collection("users").doc(decodedToken.uid).get();
    if (!adminUserDoc.exists || adminUserDoc.data()?.userType !== "admin") {
      return NextResponse.json({ message: "Forbidden: Not an admin" }, { status: 403 });
    }

    const { userId, userType } = await request.json();

    if (!userId || !userType) {
      return NextResponse.json({ message: "Missing userId or userType" }, { status: 400 });
    }

    // Update userType in Firestore
    await adminDb.collection("users").doc(userId).update({
      userType: userType,
    });

    // Optionally, update custom claims in Firebase Auth if needed for client-side checks
    // await adminAuth.setCustomUserClaims(userId, { userType: userType });

    return NextResponse.json({ message: "User type updated successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating user type:", error);
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
  }
}