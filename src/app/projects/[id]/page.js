import { connectDB, Project } from '../../../../lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi';

export default async function ProjectPage(props) {
  const { id } = await props.params;

  // If id is literally "undefined", someone clicked a card with no _id
  if (!id || id === 'undefined') notFound();

  await connectDB();
  const raw = await Project.findById(id).lean();

  if (!raw) notFound();

  const project = {
    title: raw.title,
    description: raw.description,
    tech: raw.tech,
    github: raw.github || null,
    live: raw.live || null,
    _id: raw._id.toString(),
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16">
      <div className="max-w-3xl mx-auto mb-10">
        <Link href="/#projects"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors text-sm">
          <FiArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-white text-3xl font-bold">{project.title}</h1>
            <div className="flex gap-3 shrink-0 mt-1">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 border border-zinc-700 hover:border-emerald-500/50 text-zinc-400 hover:text-emerald-400 px-4 py-2 rounded-xl text-sm transition-all">
                  <FiGithub size={15} /> GitHub
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-4 py-2 rounded-xl text-sm transition-all">
                  <FiExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t}
                className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-6">
          <h2 className="text-emerald-400 text-xs uppercase tracking-widest mb-4">About this project</h2>
          <p className="text-zinc-300 leading-relaxed text-base">{project.description}</p>
        </div>

        {(project.github || project.live) && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-emerald-400 text-xs uppercase tracking-widest mb-4">Links</h2>
            <div className="flex flex-col gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="flex items-center justify-between group bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 px-5 py-4 rounded-xl transition-all">
                  <div className="flex items-center gap-3">
                    <FiGithub className="text-zinc-500 group-hover:text-emerald-400 transition-colors" size={18} />
                    <span className="text-zinc-400 group-hover:text-white transition-colors text-sm">GitHub Repository</span>
                  </div>
                  <span className="text-zinc-600 group-hover:text-emerald-400 text-xs transition-colors truncate max-w-[200px]">{project.github}</span>
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer"
                  className="flex items-center justify-between group bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 px-5 py-4 rounded-xl transition-all">
                  <div className="flex items-center gap-3">
                    <FiExternalLink className="text-zinc-500 group-hover:text-emerald-400 transition-colors" size={18} />
                    <span className="text-zinc-400 group-hover:text-white transition-colors text-sm">Live Website</span>
                  </div>
                  <span className="text-zinc-600 group-hover:text-emerald-400 text-xs transition-colors truncate max-w-[200px]">{project.live}</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}