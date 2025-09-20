import { ObjectId } from 'mongodb';

/**
 * User model for MongoDB
 * 
 * This model defines the structure for user documents in the MongoDB collection
 * and provides methods for user-related operations.
 */
export default class User {
  /**
   * Create a new user
   * @param {Object} db - MongoDB database instance
   * @param {Object} userData - User data to create
   * @returns {Promise<Object>} - Created user object
   */
  static async create(db, userData) {
    const now = new Date();
    
    const newUser = {
      email: userData.email,
      displayName: userData.displayName || userData.email.split('@')[0],
      phoneNumber: userData.phoneNumber || null,
      authMethod: userData.authMethod || 'email',
      role: userData.role || 'candidate',
      profileComplete: userData.profileComplete || false,
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await db.collection('users').insertOne(newUser);
    return { ...newUser, _id: result.insertedId };
  }
  
  /**
   * Find a user by email
   * @param {Object} db - MongoDB database instance
   * @param {string} email - User email
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  static async findByEmail(db, email) {
    return db.collection('users').findOne({ email });
  }
  
  /**
   * Find a user by phone number
   * @param {Object} db - MongoDB database instance
   * @param {string} phoneNumber - User phone number
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  static async findByPhone(db, phoneNumber) {
    return db.collection('users').findOne({ phoneNumber });
  }
  
  /**
   * Find a user by ID
   * @param {Object} db - MongoDB database instance
   * @param {string} id - User ID
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  static async findById(db, id) {
    return db.collection('users').findOne({ _id: new ObjectId(id) });
  }
  
  /**
   * Update a user
   * @param {Object} db - MongoDB database instance
   * @param {string} id - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object|null>} - Updated user object or null if not found
   */
  static async update(db, id, updateData) {
    const updateObj = {
      ...updateData,
      updatedAt: new Date()
    };
    
    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateObj },
      { returnDocument: 'after' }
    );
    
    return result.value;
  }
  
  /**
   * Create indexes for the users collection
   * @param {Object} db - MongoDB database instance
   */
  static async createIndexes(db) {
    try {
      // Check if indexes already exist before creating them
      const existingIndexes = await db.collection('users').listIndexes().toArray();
      const indexNames = existingIndexes.map(index => index.name);
      
      // Create email index only if it doesn't exist
      if (!indexNames.includes('email_1')) {
        await db.collection('users').createIndex({ email: 1 }, { unique: true, sparse: true });
        console.log('Created email index');
      }
      
      // Create phoneNumber index only if it doesn't exist
      if (!indexNames.includes('phoneNumber_1')) {
        await db.collection('users').createIndex({ phoneNumber: 1 }, { unique: true, sparse: true });
        console.log('Created phoneNumber index');
      }
    } catch (error) {
      // If indexes already exist or there's a conflict, just log and continue
      console.log('Indexes already exist or error creating indexes:', error.message);
    }
  }
}