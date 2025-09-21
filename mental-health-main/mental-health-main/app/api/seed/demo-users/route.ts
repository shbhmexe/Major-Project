import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    // Demo users to create
    const demoUsers = [
      {
        firstName: "Demo",
        lastName: "Student", 
        email: "student@sukoon.app",
        password: "student123",
        role: "STUDENT" as const,
        college: "Delhi Institute Of Technology And Management",
        department: "Computer Science",
        academicYear: "THIRD" as const
      },
      {
        firstName: "Demo", 
        lastName: "Admin",
        email: "admin@sukoon.app", 
        password: "admin123",
        role: "ADMIN" as const,
        college: null,
        department: null,
        academicYear: null
      }
    ];

    await prisma.$connect();

    const createdUsers = [];

    for (const user of demoUsers) {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email }
      });

      if (!existingUser) {
        // Hash password
        const hashedPassword = await bcrypt.hash(user.password, 12);
        
        // Create user
        const newUser = await prisma.user.create({
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            role: user.role,
            college: user.college,
            department: user.department,
            academicYear: user.academicYear,
          },
        });

        createdUsers.push({
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          name: `${newUser.firstName} ${newUser.lastName}`
        });
      } else {
        createdUsers.push({
          id: existingUser.id,
          email: existingUser.email,
          role: existingUser.role,
          name: `${existingUser.firstName} ${existingUser.lastName}`,
          status: 'already_exists'
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Demo users created successfully",
      users: createdUsers,
      count: createdUsers.length
    });

  } catch (error: any) {
    console.error('Demo users creation failed:', error);
    
    return NextResponse.json({
      success: false,
      error: "Failed to create demo users",
      details: error.message
    }, { status: 500 });
    
  } finally {
    await prisma.$disconnect().catch(() => {});
  }
}