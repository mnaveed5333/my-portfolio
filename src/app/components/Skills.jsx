'use client';
import { useEffect, useRef } from 'react';

const skillGroups = [
  {
    label: 'Frontend',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
    accent: 'bg-emerald-500',
    skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'Tailwind CSS', 'Redux Toolkit'],
  },
  {
    label: 'Backend',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
    accent: 'bg-emerald-500',
    skills: ['Node.js', 'Express.js', 'REST API', 'Middleware', 'JWT Auth'],
  },
  {
    label: 'Database',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
    accent: 'bg-emerald-500',
    skills: ['MongoDB', 'Mongoose', 'Schema Design', 'CRUD Operations'],
  },
  {
    label: 'Auth & Security',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
    accent: 'bg-emerald-500',
    skills: ['Clerk Auth', 'JWT', 'Protected Routes', 'Session Management'],
  },
  {
    label: 'Dev Tools',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
    accent: 'bg-emerald-500',
    skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Netlify', 'Postman'],
  },
  {
    label: 'Core Concepts',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
    accent: 'bg-emerald-500',
    skills: ['SSR', 'SSG', 'ISR', 'State Management', 'API Integration', 'Responsive Design'],
  },
];

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-6');
          }
        });
      },
      { threshold: 0.1 }
    );
    const cards = ref.current?.querySelectorAll('.skill-card');
    cards?.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="bg-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Heading */}
        <div className="mb-14">
          <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">What I work with</p>
          <h2 className="text-4xl font-bold text-white">
            Skills &amp; <span className="text-emerald-400">Tech Stack</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <div
              key={group.label}
              className={`skill-card opacity-0 translate-y-6 transition-all duration-500 rounded-2xl border ${group.border} bg-gradient-to-br ${group.color} p-5`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${group.accent}`} />
                <span className="text-zinc-300 text-sm font-semibold uppercase tracking-wider">
                  {group.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-zinc-300 bg-zinc-800/60 border border-zinc-700/50 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
