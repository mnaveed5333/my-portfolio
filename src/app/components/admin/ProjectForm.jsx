'use client';
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function ProjectForm({ project, onClose, onRefresh }) {
  const [form, setForm] = useState({
    title: '', description: '', tech: '', github: '', live: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || '',
        description: project.description || '',
        tech: (project.tech || []).join(', '),
        github: project.github || '',
        live: project.live || '',
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        title: form.title,
        description: form.description,
        tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
        github: form.github,
        live: form.live,
        ...(project && { _id: project._id }),
      };
      const res = await fetch('/api/projects', {
        method: project ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }
      onRefresh();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-zinc-600";

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-8 relative">
        <button onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
          <FiX size={20} />
        </button>

        <h2 className="text-white font-bold text-lg mb-6">
          {project ? 'Edit Project' : 'Add New Project'}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-wide block mb-1.5">Project Title *</label>
            <input type="text" value={form.title} required
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="My Awesome Project" className={inputClass} />
          </div>

          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-wide block mb-1.5">Description *</label>
            <textarea value={form.description} required rows={3}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What does this project do?"
              className={`${inputClass} resize-none`} />
          </div>

          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-wide block mb-1.5">
              Tech Stack * <span className="text-zinc-600 normal-case">(comma separated)</span>
            </label>
            <input type="text" value={form.tech} required
              onChange={(e) => setForm({ ...form, tech: e.target.value })}
              placeholder="React, Next.js, Tailwind" className={inputClass} />
          </div>

          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-wide block mb-1.5">GitHub URL</label>
            <input type="text" value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              placeholder="https://github.com/..." className={inputClass} />
          </div>

          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-wide block mb-1.5">Live URL</label>
            <input type="text" value={form.live}
              onChange={(e) => setForm({ ...form, live: e.target.value })}
              placeholder="https://example.com" className={inputClass} />
          </div>

          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-zinc-700 hover:border-zinc-600 text-zinc-400 py-3 rounded-xl text-sm transition-all">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-semibold py-3 rounded-xl text-sm transition-all">
              {loading ? 'Saving...' : project ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
