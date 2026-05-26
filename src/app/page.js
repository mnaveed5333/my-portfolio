import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { getProjects } from '../../lib/projects';

export default function Home() {
  const projects = getProjects();
  return (
    <main className="bg-zinc-950 min-h-screen">
      <Navbar />
      <section id="home"><Hero /></section>
      <section id="projects"><Projects projects={projects} /></section>
      <Footer />
    </main>
  );
}