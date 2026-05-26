import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'projects.json');

export function getProjects() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function saveProjects(projects) {
  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));
}