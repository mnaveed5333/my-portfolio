'use client';

const timeline = [
  {
    type: 'education',
    title: 'BS Data Science',
    org: 'Government College University Faisalabad',
    period: 'Sep 2023 – Present',
    note: 'Expected Graduation: 2027',
    borderLeft: 'border-l-emerald-500',
    dot: 'bg-emerald-500',
    badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
  {
    type: 'course',
    title: 'Full-Stack Development (FSD)',
    org: 'Corvit Systems, Faisalabad',
    period: 'Aug 2025',
    note: 'Advanced Next.js, MERN stack, deployment pipelines, professional workflows',
    borderLeft: 'border-l-emerald-400',
    dot: 'bg-emerald-400',
    badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
  {
    type: 'self-learning',
    title: 'Self-Directed Learning',
    org: 'Thapa Technical · GreatStack · Apna College · Official Docs',
    period: 'Ongoing',
    note: 'React, Next.js, Node.js, MongoDB — continuously expanding full-stack expertise',
    borderLeft: 'border-l-zinc-500',
    dot: 'bg-zinc-500',
    badge: 'text-zinc-400 bg-zinc-700/30 border-zinc-600/40',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-zinc-950 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Background</p>
          <h2 className="text-4xl font-bold text-white">
            Education &amp; <span className="text-emerald-400">Learning</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-zinc-800" />

          <div className="flex flex-col gap-10">
            {timeline.map((item) => (
              <div key={item.title} className="relative pl-12">
                {/* Dot */}
                <span
                  className={`absolute left-0 top-1.5 w-6 h-6 rounded-full ${item.dot} ring-4 ring-zinc-950 flex items-center justify-center`}
                >
                  <span className="w-2 h-2 bg-zinc-950 rounded-full" />
                </span>

                {/* Card */}
                <div className={`border-l-2 ${item.borderLeft} bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5`}>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${item.badge}`}>
                      {item.type}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mb-1">{item.org}</p>
                  <p className="text-zinc-500 text-xs mb-3">{item.period}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}