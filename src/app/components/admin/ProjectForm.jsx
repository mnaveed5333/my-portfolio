'use client';
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function ProjectForm({ project, onClose, onRefresh }) {
  const [form, setForm] = useState({
    title: '', description: '', tech: '', github: '', live: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title,
        description: project.description,
        tech: project.tech.join(', '),
        github: project.github || '',
        live: project.live || '',
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
      ...(project && { _id: project._id }), // ← send _id not id
    };
    await fetch('/api/projects', {
      method: project ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    onRefresh();
    onClose();
  };

  const fields = [
    { key: 'title', label: 'Project Title', placeholder: 'My Awesome Project' },
    { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/...' },
    { key: 'live', label: 'Live URL', placeholder: 'https://example.com' },
  ];

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-zinc-400 text-xs uppercase tracking-wide block mb-1.5">{label}</label>
              <input
                type="text"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                required={key === 'title'}
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-zinc-600"
              />
            </div>
          ))}

          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-wide block mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What does this project do?"
              required rows={3}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-zinc-600 resize-none"
            />
          </div>

          <div>
            <label className="text-zinc-400 text-xs uppercase tracking-wide block mb-1.5">
              Tech Stack <span className="text-zinc-600 normal-case">(comma separated)</span>
            </label>
            <input
              type="text"
              value={form.tech}
              onChange={(e) => setForm({ ...form, tech: e.target.value })}
              placeholder="React, Next.js, Tailwind"
              required
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-zinc-600"
            />
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