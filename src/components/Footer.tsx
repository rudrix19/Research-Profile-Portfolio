import React from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const socials = [
  {
    Icon: Github,
    href: 'https://github.com/rudrix19',
    label: 'GitHub',
    testId: 'social-github'
  },
  {
    Icon: Linkedin,
    href: 'https://www.linkedin.com/in/rudrix-19-iiserp/',
    label: 'LinkedIn',
    testId: 'social-linkedin'
  },
  {
    Icon: Instagram,
    href: 'https://www.instagram.com/cosmic_cognoscente/',
    label: 'Instagram',
    testId: 'social-instagram'
  },
  {
    Icon: Mail,
    href: 'mailto:rudra.sahu@students.iiserpune.ac.in',
    label: 'Email',
    testId: 'social-email'
  }
];

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative z-10 border-t border-white/10 mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <p className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-zinc-400">
            ✦ Currently in superposition
          </p>
          <h3 className="font-serif-display text-3xl sm:text-4xl mt-4 text-white font-light italic">
            Still learning, still exploring.
          </h3>
          <p className="text-zinc-500 mt-4 text-sm max-w-md leading-relaxed">
            A quiet corner of the internet for thoughts, projects and small wonderings between coursework and the cosmos.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-4">
            Elsewhere
          </p>
          <div className="flex flex-col gap-3">
            {socials.map(({ Icon, href, label, testId }) => (
              <a
                key={label}
                href={href}
                data-testid={testId}
                className="group inline-flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300"
              >
                <Icon size={14} strokeWidth={1.2} />
                <span className="text-sm">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono-tag text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-4">
            Coordinates
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            IISER Pune
            <br />
            Dr. Homi Bhabha Road
            <br />
            Pashan, Pune 411008
          </p>
          <p className="font-mono-tag text-[10px] tracking-[0.2em] uppercase text-zinc-600 mt-6">
            18.5471° N · 73.8056° E
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono-tag text-[10px] tracking-[0.2em] uppercase text-zinc-600">
            © {new Date().getFullYear()} Rudra Sahu · Built with curiosity
          </p>
          <p className="font-mono-tag text-[10px] tracking-[0.2em] uppercase text-zinc-600">
            v1.0 — Notes_from_the_Noise.exe
          </p>
        </div>
      </div>
    </footer>
  );
}
