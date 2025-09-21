import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; 
import { createSession } from "@/lib/auth";
import { authenticateUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Test database connection first
    try {
      await prisma.$connect();
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return NextResponse.json({ error: "Database connection failed. Please try again later." }, { status: 503 });
    }

    // Find user by email
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
      });
    } catch (error) {
      console.error('Error finding user:', error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare password
    let isPasswordValid;
    try {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } catch (error) {
      console.error('Password comparison error:', error);
      return NextResponse.json({ error: "Authentication error" }, { status: 500 });
    }

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create session
    try {
      const sessionUser = await authenticateUser(email, password);
      if (!sessionUser) {
        throw new Error("Failed to create session");
      }
      await createSession(sessionUser);
    } catch (sessionError) {
      console.error('Session creation error:', sessionError);
      // Don't fail login if session creation fails, just log it
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id.toString(),
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role.toLowerCase(),
      },
    });
    
  } catch (error: any) {
    console.error('Login API error:', error);
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: "Authentication failed", 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    }, { status: 500 });
  } finally {
    // Ensure database connection is closed
    await prisma.$disconnect().catch(() => {});
  }
}
