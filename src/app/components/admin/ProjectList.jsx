import { FiEdit2, FiTrash2, FiExternalLink, FiGithub } from 'react-icons/fi';

export default function ProjectList({ projects, onEdit, onRefresh }) {
  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await fetch('/api/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    onRefresh();
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-600 border border-zinc-800 rounded-2xl">
        No projects yet. Add your first one!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {projects.map((project) => (
        <div key={project.id}
          className="bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 rounded-2xl px-6 py-5 flex items-start justify-between gap-4 transition-all">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold mb-1">{project.title}</h3>
            <p className="text-zinc-500 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t}
                  className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="text-zinc-500 hover:text-emerald-400 p-2 transition-colors">
                <FiGithub size={16} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer"
                className="text-zinc-500 hover:text-emerald-400 p-2 transition-colors">
                <FiExternalLink size={16} />
              </a>
            )}
            <button onClick={() => onEdit(project)}
              className="text-zinc-500 hover:text-emerald-400 p-2 transition-colors">
              <FiEdit2 size={16} />
            </button>
            <button onClick={() => handleDelete(project.id)}
              className="text-zinc-500 hover:text-red-400 p-2 transition-colors">
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}