'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCode } from 'react-icons/fa';
import { FiLogOut, FiPlus } from 'react-icons/fi';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';

export default function AdminClient() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const router = useRouter();

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleLogout = async () => {
    const res = await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    const data = await res.json();
    router.push(data.redirect);        // ← uses route from backend
    router.refresh();
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditProject(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <FaCode className="text-emerald-400" size={22} />
            <h1 className="text-white font-bold text-xl">Admin Dashboard</h1>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-500/40 px-4 py-2 rounded-xl text-sm transition-all">
            <FiLogOut size={15} />
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Projects', value: projects.length },
            { label: 'Technologies', value: [...new Set(projects.flatMap(p => p.tech))].length },
            { label: 'Live Projects', value: projects.filter(p => p.live).length },
          ].map((stat) => (
            <div key={stat.label}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5">
              <p className="text-zinc-500 text-xs uppercase tracking-wide mb-1">{stat.label}</p>
              <p className="text-emerald-400 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Add button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">Projects</h2>
          <button onClick={() => { setEditProject(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
            <FiPlus size={16} />
            Add Project
          </button>
        </div>

        {/* Project List */}
        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onRefresh={fetchProjects}
        />

        {/* Modal Form */}
        {showForm && (
          <ProjectForm
            project={editProject}
            onClose={handleClose}
            onRefresh={fetchProjects}
          />
        )}
      </div>
    </div>
  );
}