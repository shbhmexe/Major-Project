import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Make sure prisma client is exported from here
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { firstName, lastName, email, password, role, college, department, academicYear } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
    }

    // Test database connection first
    try {
      await prisma.$connect();
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return NextResponse.json({ error: "Database connection failed. Please try again later." }, { status: 503 });
    }

    // Check if user already exists
    try {
      const existingUser = await prisma.user.findUnique({ 
        where: { email },
        select: { id: true }
      });
      
      if (existingUser) {
        return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
      }
    } catch (error) {
      console.error('Error checking existing user:', error);
      return NextResponse.json({ error: "Error checking user existence" }, { status: 500 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    try {
      const newUser = await prisma.user.create({
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.toLowerCase().trim(),
          password: hashedPassword,
          role: role.toUpperCase() as 'STUDENT' | 'ADMIN',
          college: college?.trim() || null,
          department: department?.trim() || null,
          academicYear: academicYear ? academicYear.toUpperCase() as 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH' : null,
        },
      });

      return NextResponse.json({
        ok: true,
        message: "Account created successfully",
        userId: newUser.id,
        user: {
          id: newUser.id.toString(),
          email: newUser.email,
          name: `${newUser.firstName} ${newUser.lastName}`,
          role: newUser.role.toLowerCase(),
        }
      });
      
    } catch (createError: any) {
      console.error('Error creating user:', createError);
      
      // Handle specific Prisma errors
      if (createError.code === 'P2002') {
        return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
      }
      
      return NextResponse.json({ error: "Failed to create user account" }, { status: 500 });
    }
    
  } catch (error: any) {
    console.error('Signup API error:', error);
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: "Internal server error", 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    }, { status: 500 });
  } finally {
    // Ensure database connection is closed
    await prisma.$disconnect().catch(() => {});
  }
}
