import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  uid: { type: String, unique: true }, // renamed from `id` — avoids Mongoose virtual conflict
  title: String,
  description: String,
  tech: [String],
  github: String,
  live: String,
});

export const Project =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
}