import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, userType } = await request.json();

    if (!email || !password || !firstName || !lastName || !userType) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Create user in Firebase Authentication
    const userRecord = await adminAuth.createUser({
      email,
      password,
    });

    // Create user document in Firestore with default profile data
    await adminDb.collection("users").doc(userRecord.uid).set({
      firstName,
      lastName,
      email,
      userType,
      createdAt: new Date().toISOString(),
      phone: "",
      dateOfBirth: "",
      gender: "",
      location: "",
      bio: "",
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        appointmentReminders: true,
        moodReminders: true,
        weeklyReports: true,
        marketingEmails: false,
        language: "english",
        timezone: "EST",
        theme: "light",
      },
    });

    return NextResponse.json({ message: "User created successfully!" }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.code === "auth/email-already-in-use") {
      return NextResponse.json({ message: "Email already in use. Please use a different email." }, { status: 409 }); // 409 Conflict
    }
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
  }
}