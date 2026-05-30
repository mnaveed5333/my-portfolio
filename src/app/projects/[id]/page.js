import { connectDB, Project } from '../../../../lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi';

export default async function ProjectPage(props) {
  const { id } = await props.params;

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
    <main className="min-h-screen bg-zinc-950 px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto mb-8 sm:mb-10">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors text-sm"
        >
          <FiArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 md:p-8 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-5">
            <div className="flex-1 min-w-0">
              <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
                {project.title}
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-emerald-500/50 text-zinc-400 hover:text-emerald-400 px-4 py-3 rounded-xl text-sm transition-all w-full sm:w-auto"
                >
                  <FiGithub size={15} />
                  GitHub
                </a>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-4 py-3 rounded-xl text-sm transition-all w-full sm:w-auto"
                >
                  <FiExternalLink size={15} />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs sm:text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 md:p-8 mb-6">
          <h2 className="text-emerald-400 text-xs uppercase tracking-widest mb-4">
            About this project
          </h2>

          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base break-words">
            {project.description}
          </p>
        </div>

        {/* Links Card */}
        {(project.github || project.live) && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 md:p-8">
            <h2 className="text-emerald-400 text-xs uppercase tracking-widest mb-4">
              Links
            </h2>

            <div className="flex flex-col gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 px-4 sm:px-5 py-4 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FiGithub
                      className="text-zinc-500 group-hover:text-emerald-400 transition-colors shrink-0"
                      size={18}
                    />
                    <span className="text-zinc-400 group-hover:text-white transition-colors text-sm">
                      GitHub Repository
                    </span>
                  </div>

                  <span className="text-zinc-600 group-hover:text-emerald-400 text-xs transition-colors break-all sm:max-w-[220px]">
                    {project.github}
                  </span>
                </a>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 px-4 sm:px-5 py-4 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FiExternalLink
                      className="text-zinc-500 group-hover:text-emerald-400 transition-colors shrink-0"
                      size={18}
                    />
                    <span className="text-zinc-400 group-hover:text-white transition-colors text-sm">
                      Live Website
                    </span>
                  </div>

                  <span className="text-zinc-600 group-hover:text-emerald-400 text-xs transition-colors break-all sm:max-w-[220px]">
                    {project.live}
                  </span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
            }
