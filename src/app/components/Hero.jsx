import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for work
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
            M Naveed
          </span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          A web developer who builds clean, fast, and modern web experiences
          using React, Next.js, Node.js, and MongoDB.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href="#projects" className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-8 py-3 rounded-xl transition-all duration-200 text-sm">
            View Projects
          </a>
          <a href="mailto:mnaveed5333425@gmail.com" className="border border-zinc-700 hover:border-emerald-500/50 text-zinc-300 hover:text-emerald-400 px-8 py-3 rounded-xl transition-all duration-200 text-sm">
            Contact Me
          </a>
        </div>

        <div className="flex items-center justify-center gap-5 mt-10">
          {[
            { icon: <FiGithub size={20} />, href: 'https://github.com/mnaveed5333' },
            { icon: <FiLinkedin size={20} />, href: 'www.linkedin.com/in/muhammad-naveed-013441389' },
            { icon: <FiMail size={20} />, href: 'mailto:mnaveed5333425@gmail.com' },
            { icon: <FaWhatsapp size={20} />, href: 'https://wa.me/923151639533' },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors">
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}