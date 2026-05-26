import Link from 'next/link';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between">
        {/* ← title now links to project page */}
        <Link href={`/projects/${project.id}`}>
          <h3 className="text-white font-semibold text-lg group-hover:text-emerald-400 transition-colors cursor-pointer">
            {project.title}
          </h3>
        </Link>
        <div className="flex gap-3">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
              className="text-zinc-500 hover:text-emerald-400 transition-colors">
              <FiGithub size={18} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer"
              className="text-zinc-500 hover:text-emerald-400 transition-colors">
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="text-zinc-500 text-sm leading-relaxed flex-1">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t}
            className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
            {t}
          </span>
        ))}
      </div>

      {/* ← view details link at bottom */}
      <Link href={`/projects/${project.id}`}
        className="text-xs text-zinc-600 hover:text-emerald-400 transition-colors mt-1">
        View details →
      </Link>
    </div>
  );
}