import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '../../../../lib/projects';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}

export async function POST(req) {
  const body = await req.json();
  const projects = getProjects();
  const newProject = { id: uuidv4(), ...body };
  projects.push(newProject);
  saveProjects(projects);
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(req) {
  const body = await req.json();
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === body.id);
  if (index === -1)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  projects[index] = { ...projects[index], ...body };
  saveProjects(projects);
  return NextResponse.json(projects[index]);
}

export async function DELETE(req) {
  const { id } = await req.json();
  const projects = getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  saveProjects(filtered);
  return NextResponse.json({ success: true });
}