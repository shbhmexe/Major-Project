import mongoose from 'mongoose';

const UserPreferenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  guestId: {
    type: String,
    index: true
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'system'
  },
  fontSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'medium'
  },
  aiResponseStyle: {
    type: String,
    enum: ['concise', 'detailed', 'supportive'],
    default: 'supportive'
  },
  language: {
    type: String,
    default: 'en'
  },
  notificationsEnabled: {
    type: Boolean,
    default: true
  },
  soundEnabled: {
    type: Boolean,
    default: true
  },
  customPrompt: {
    type: String,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Ensure only one preference document per user/guest
UserPreferenceSchema.index({ userId: 1 }, { unique: true, sparse: true });
UserPreferenceSchema.index({ guestId: 1 }, { unique: true, sparse: true });

// Validate that either userId or guestId is provided
UserPreferenceSchema.pre('validate', function(next) {
  if (!this.userId && !this.guestId) {
    next(new Error('Either userId or guestId must be provided'));
  } else {
    next();
  }
});

export default mongoose.models.UserPreference || mongoose.model('UserPreference', UserPreferenceSchema);