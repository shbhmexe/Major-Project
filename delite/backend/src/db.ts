import mongoose from 'mongoose';

export async function connectDatabase(uri: string): Promise<void> {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(uri);
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    provider: { type: String, enum: ['email', 'google'], required: true },
    name: { type: String },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', userSchema);
export const NoteModel = mongoose.model('Note', noteSchema);

