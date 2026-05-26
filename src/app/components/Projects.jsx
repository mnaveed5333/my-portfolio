import ProjectCard from './ProjectCard';

export default function Projects({ projects }) {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          My <span className="text-emerald-400">Projects</span>
        </h2>
        <p className="text-zinc-500 max-w-md mx-auto text-sm">
          A collection of things I've built — from side projects to full products.
        </p>
        <div className="w-12 h-0.5 bg-emerald-500 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}