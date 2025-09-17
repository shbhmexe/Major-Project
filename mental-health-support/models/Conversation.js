import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['user', 'ai'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ConversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow anonymous conversations
  },
  guestId: {
    type: String,
    required: false // For guest users without accounts
  },
  title: {
    type: String,
    default: 'New Conversation'
  },
  messages: [MessageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Update the updatedAt timestamp before saving
ConversationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create a title based on the first user message if title is default
ConversationSchema.pre('save', function(next) {
  if (this.title === 'New Conversation' && this.messages.length > 0) {
    const userMessages = this.messages.filter(msg => msg.type === 'user');
    if (userMessages.length > 0) {
      const firstUserMessage = userMessages[0].content;
      // Truncate and use as title if longer than 30 characters
      this.title = firstUserMessage.length > 30 
        ? firstUserMessage.substring(0, 30) + '...'
        : firstUserMessage;
    }
  }
  next();
});

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);