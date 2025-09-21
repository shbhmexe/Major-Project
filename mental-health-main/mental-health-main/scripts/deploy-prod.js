#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing for production deployment...');

// Copy production schema to main schema
const productionSchema = path.join(__dirname, '..', 'prisma', 'schema.production.prisma');
const mainSchema = path.join(__dirname, '..', 'prisma', 'schema.prisma');

if (fs.existsSync(productionSchema)) {
  fs.copyFileSync(productionSchema, mainSchema);
  console.log('✅ Switched to PostgreSQL schema for production');
} else {
  console.warn('⚠️  Production schema not found, using existing schema');
}

console.log('📦 Ready for production build!');