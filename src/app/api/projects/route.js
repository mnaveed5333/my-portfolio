import { NextResponse } from 'next/server';
import { connectDB, Project } from '../../../../lib/projects';

export async function GET() {
  await connectDB();
  const raw = await Project.find({}).lean();
  const projects = raw.map((p) => ({ ...p, _id: p._id.toString() }));
  return NextResponse.json(projects);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const project = await Project.create(body);
  return NextResponse.json(
    { ...project.toObject(), _id: project._id.toString() },
    { status: 201 }
  );
}

export async function PUT(req) {
  await connectDB();
  const body = await req.json();
  const project = await Project.findByIdAndUpdate(
    body._id,
    { title: body.title, description: body.description, tech: body.tech, github: body.github, live: body.live },
    { new: true }
  ).lean();
  if (!project)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ...project, _id: project._id.toString() });
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json(); // id here is the _id string
  const deleted = await Project.findByIdAndDelete(id);
  if (!deleted)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}