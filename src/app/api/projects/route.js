import { NextResponse } from 'next/server';
import { connectDB, Project } from '../../../../lib/projects';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  await connectDB();
  const projects = await Project.find({});
  return NextResponse.json(projects);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const project = await Project.create({ id: uuidv4(), ...body });
  return NextResponse.json(project, { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const body = await req.json();
  const project = await Project.findByIdAndUpdate(
    body._id,
    { ...body },
    { new: true }
  );
  if (!project)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}