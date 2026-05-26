import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Footer from './components/Footer';
import { connectDB, Project } from '../../lib/projects';

export default async function Home() {
  await connectDB();
  const raw = await Project.find({}).lean();

  const projects = raw.map((p) => ({
    title: p.title,
    description: p.description,
    tech: p.tech,
    github: p.github || null,
    live: p.live || null,
    _id: p._id.toString(),
  }));

  return (
    <main className="bg-zinc-950 min-h-screen">
      <Navbar />
      <section id="home"><Hero /></section>
      <section id="projects"><Projects projects={projects} /></section>
      <section id="skills"><Skills /></section>
      
      <section id="experience"><Experience /></section>
      
      <Footer />
    </main>
  );
}