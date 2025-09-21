#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

async function setupDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Setting up production database...');
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Check if database is already set up
    const userCount = await prisma.user.count();
    console.log(`📊 Current user count: ${userCount}`);
    
    console.log('✅ Database setup completed!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    
    // If it's a connection error, provide helpful info
    if (error.message.includes('connect')) {
      console.log('💡 Make sure DATABASE_URL environment variable is set correctly in Vercel');
      console.log('💡 Check that your PostgreSQL database is running and accessible');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();