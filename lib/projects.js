import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tech: [String],
  github: String,
  live: String,
  image: String,
});

// ✅ Safe for Next.js - no errors, no cache issues
export const Project =
  mongoose.models.Project ??
  mongoose.model('Project', ProjectSchema);

export async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
}