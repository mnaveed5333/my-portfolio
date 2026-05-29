import { NextResponse } from 'next/server';
import { connectDB, Project } from '../../../../lib/projects';
import { cookies } from 'next/headers';

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_token')?.value === 'authenticated';
}

export async function GET() {
  try {
    await connectDB();
    const raw = await Project.find({}).lean();
    const projects = raw.map((p) => ({ ...p, _id: p._id.toString() }));
    return NextResponse.json(projects);
  } catch (err) {
    console.error('GET /api/projects error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!(await isAuthenticated()))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const body = await req.json();
    const project = await Project.create(body);
    return NextResponse.json(
      { ...project.toObject(), _id: project._id.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST /api/projects error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    if (!(await isAuthenticated()))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const body = await req.json();
    const project = await Project.findByIdAndUpdate(
      body._id,
      {
        title: body.title,
        description: body.description,
        tech: body.tech,
        github: body.github,
        live: body.live,
      },
      { new: true }
    ).lean();
    if (!project)
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ...project, _id: project._id.toString() });
  } catch (err) {
    console.error('PUT /api/projects error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    if (!(await isAuthenticated()))
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const { id } = await req.json();
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/projects error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}